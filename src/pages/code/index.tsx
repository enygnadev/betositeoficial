// pages/dashboard/codigos.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Box, Button, TextField, Typography, Select, MenuItem,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton,
  Paper, useMediaQuery, Grid
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { collection, addDoc, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/logic/firebase/config/app';
import Forcaautenticacao from '@/components/autenticacao/ForcarAutenticacao';

const gerarCodigoAleatorio = (length = 8) => {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
};

export default function DashboardCodigos() {
  const [tipo, setTipo] = useState<'temporario' | 'permanente'>('temporario');
  const [codigoManual, setCodigoManual] = useState('');
  const [observacao, setObservacao] = useState('');
  const [codigos, setCodigos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [filtro, setFiltro] = useState('');
  const isMobile = useMediaQuery('(max-width: 768px)');

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
      observacao,
      criadoEm: Timestamp.now(),
      expiraEm: dataExpiracao,
      ativo: true,
    });

    setCodigoManual('');
    setObservacao('');
    carregarCodigos();
  };

  const excluirCodigo = async (id: string) => {
    if (confirm('Deseja excluir este código?')) {
      await deleteDoc(doc(db, 'CodigosDeAcesso', id));
      carregarCodigos();
    }
  };

  const codigosFiltrados = codigos.filter(c =>
    c.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
    (c.observacao || '').toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <Forcaautenticacao>
      <Box p={2} bgcolor="#f5f7fa" minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Box maxWidth={1200} width="100%" display="flex" justifyContent="center">
          <Paper elevation={4} style={{ padding: 32, borderRadius: 24, backgroundColor: '#ffffff', width: '100%' }}>
            <Typography variant="h4" gutterBottom align="center" style={{ color: '#2d5a3d', fontWeight: 700 }}>
              🎯 Painel de Códigos de Acesso
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={3}>
                <Select
                  fullWidth
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as any)}
                >
                  <MenuItem value="temporario">Temporário (3h)</MenuItem>
                  <MenuItem value="permanente">Permanente</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="Código Manual"
                  value={codigoManual}
                  onChange={(e) => setCodigoManual(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Observação (quem está usando)"
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  style={{ background: 'linear-gradient(90deg, #2d5a3d, #4a7c59)', color: '#fff', fontWeight: 600 }}
                  onClick={() => adicionarCodigo(!!codigoManual)}
                >
                  Criar Código
                </Button>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="🔍 Buscar código ou observação"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Box mt={5}>
              <Table size={isMobile ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Código</strong></TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Validade</TableCell>
                    <TableCell>Observação</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {codigosFiltrados.map(c => (
                    <TableRow key={c.id}>
                      <TableCell>{c.codigo}</TableCell>
                      <TableCell>{c.tipo}</TableCell>
                      <TableCell>{c.tipo === 'temporario' && c.expiraEm?.toDate?.().toLocaleString() || 'Permanente'}</TableCell>
                      <TableCell>{c.observacao || '-'}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => excluirCodigo(c.id)}><Delete color="error" /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Forcaautenticacao>
  );
}
