// pages/dashboard/codigos.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Box, Button, TextField, Typography, Select, MenuItem,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { collection, addDoc, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/logic/firebase/config/app';

const gerarCodigoAleatorio = (length = 8) => {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
};

export default function DashboardCodigos() {
  const [tipo, setTipo] = useState<'temporario' | 'permanente'>('temporario');
  const [codigoManual, setCodigoManual] = useState('');
  const [codigos, setCodigos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);

  const carregarCodigos = async () => {
    const querySnapshot = await getDocs(collection(db, 'CodigosDeAcesso'));
    setCodigos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    carregarCodigos();
  }, []);

  const verificarDuplicado = (codigo: string) => {
    return codigos.some(c => c.codigo === codigo);
  };

  const adicionarCodigo = async (manual?: boolean) => {
    let codigo = manual ? codigoManual.toUpperCase() : gerarCodigoAleatorio();
    if (verificarDuplicado(codigo)) {
      alert('⚠️ Código já existe. Escolha outro.');
      return;
    }
    const dataExpiracao = tipo === 'temporario'
      ? Timestamp.fromDate(new Date(Date.now() + 3 * 60 * 60 * 1000))
      : null;

    await addDoc(collection(db, 'CodigosDeAcesso'), {
      codigo,
      tipo,
      criadoEm: Timestamp.now(),
      expiraEm: dataExpiracao,
      ativo: true,
    });

    setCodigoManual('');
    carregarCodigos();
  };

  const excluirCodigo = async (id: string) => {
    if (confirm('Deseja excluir este código?')) {
      await deleteDoc(doc(db, 'CodigosDeAcesso', id));
      carregarCodigos();
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Códigos de Acesso</Typography>

      <Box mt={4} display="flex" style={{ gap: 2}} flexWrap="wrap">
        <Select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as any)}
          style={{ minWidth: 150 }}
        >
          <MenuItem value="temporario">Temporário (3h)</MenuItem>
          <MenuItem value="permanente">Permanente</MenuItem>
        </Select>

        <TextField
          label="Código Manual"
          value={codigoManual}
          onChange={(e) => setCodigoManual(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => adicionarCodigo(!!codigoManual)}
        >
          Criar Código
        </Button>
      </Box>

      <Box mt={5}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Código</strong></TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Validade</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {codigos.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.codigo}</TableCell>
                <TableCell>{c.tipo}</TableCell>
                <TableCell>{c.tipo === 'temporario' && c.expiraEm?.toDate?.().toLocaleString() || 'Permanente'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => excluirCodigo(c.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}