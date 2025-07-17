// pages/dashboard/codigos.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Box, Button, TextField, Typography, Select, MenuItem,
  IconButton, Paper, useMediaQuery, Grid, Card, CardContent, Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import {
  collection, addDoc, getDocs, deleteDoc, doc, Timestamp, updateDoc
} from 'firebase/firestore';
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
  const [filtro, setFiltro] = useState('');
  const [editando, setEditando] = useState<any | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const carregarCodigos = async () => {
    const querySnapshot = await getDocs(collection(db, 'CodigosDeAcesso'));
    const agora = new Date();

    const ativos: any[] = [];
    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();
      const expira = data.expiraEm?.toDate?.();

      if (data.tipo === 'temporario' && expira && expira <= agora) {
        await deleteDoc(doc(db, 'CodigosDeAcesso', docSnap.id));
      } else {
        ativos.push({ id: docSnap.id, ...data });
      }
    }
    setCodigos(ativos);
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

  const salvarEdicao = async () => {
    if (editando) {
      await updateDoc(doc(db, 'CodigosDeAcesso', editando.id), { observacao: editando.observacao });
      setEditando(null);
      carregarCodigos();
    }
  };

  const codigosFiltrados = codigos.filter(c =>
    c.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
    (c.observacao || '').toLowerCase().includes(filtro.toLowerCase())
  );

  const renderCards = (tipo: 'temporario' | 'permanente') => (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        {tipo === 'temporario' ? 'Acessos Temporários' : 'Acessos Permanentes'}
      </Typography>
      <Grid container spacing={2}>
        {codigosFiltrados.filter(c => c.tipo === tipo).slice(0, 10).map(c => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">🔐 {c.codigo}</Typography>
                <Typography variant="body2">
                  {tipo === 'temporario' && c.expiraEm?.toDate?.().toLocaleString() || 'Permanente'}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  🧑 {c.observacao || 'Sem observação'}
                </Typography>
                <Box mt={1} display="flex" justifyContent="space-between">
                  <IconButton onClick={() => setEditando(c)}><Edit /></IconButton>
                  <IconButton onClick={() => excluirCodigo(c.id)}><Delete color="error" /></IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Forcaautenticacao>
      <Box p={2} bgcolor="#f5f7fa" minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Box maxWidth={1200} width="100%">
          <Paper elevation={4} style={{ padding: 32, borderRadius: 24, backgroundColor: '#ffffff' }}>
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

            {renderCards('temporario')}
            {renderCards('permanente')}

            <Dialog open={!!editando} onClose={() => setEditando(null)}>
              <DialogTitle>Editar Observação</DialogTitle>
              <DialogContent>
                <TextField
                  label="Observação"
                  value={editando?.observacao || ''}
                  onChange={(e) => setEditando({ ...editando, observacao: e.target.value })}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditando(null)}>Cancelar</Button>
                <Button color="primary" onClick={salvarEdicao}>Salvar</Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Box>
      </Box>
    </Forcaautenticacao>
  );
}
