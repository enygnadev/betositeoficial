import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  Divider,
  Collapse,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Chip
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Person from '@material-ui/icons/Person';
import Business from '@material-ui/icons/Business';
import People from '@material-ui/icons/People';
import Assignment from '@material-ui/icons/Assignment';
import Dashboard from '@material-ui/icons/Dashboard';
import CloseIcon from '@material-ui/icons/Close';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Lock from '@material-ui/icons/Lock';
import ExitToApp from '@material-ui/icons/ExitToApp';
import VpnKey from '@material-ui/icons/VpnKey';
import ViewModule from '@material-ui/icons/ViewModule';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import AutenticacaoContext from '@/data/contexts/AutenticacaoContext';
import { usePermissions } from '@/hooks/usePermissions';
import LoginEmailSenha from '@/components/landing/cabecalho/LoginEmailSenha';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
 appBar: {
  backgroundColor: 'transparent !important',
  boxShadow: 'none !important',
  backdropFilter: 'none !important',
  border: 'none !important',
  position: 'absolute', // opcional, se quiser flutuar sobre o conteúdo
},

menuButton: {
  marginRight: theme.spacing(8),
  color: '#2d5a3d',
  backgroundColor: '#fff',
  zIndex: 1001,
  padding: theme.spacing(2.0), // aumenta a área do botão
  fontSize: '4rem', // força o ícone maior se necessário
},



  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  logoAvatar: {
    backgroundColor: '#2d5a3d',
    color: '#fff',
    marginRight: theme.spacing(1),
    fontWeight: 'bold',
  },
  logoText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '1.2rem',
    fontFamily: '"Playfair Display", "Georgia", serif',
  },
  drawer: {
    width: 350,
    background: 'none',
  },
  drawerPaper: {
    width: 350,
    background: 'linear-gradient(0deg, #dce3f4 -10%, #c6e5d9 80%, #b3f0d0 70%, #b3f0d0 30%)',
    color: '#fff',
  },
  drawerContent: {
    display: 'flex',
    background: 'none',
    flexDirection: 'column',
    height: '100%',
  },
  drawerHeader: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  drawerTitle: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    fontFamily: '"Playfair Display", "Georgia", serif',
  },
  closeButton: {
    color: '#fff',
  },
  sectionHeader: {
    padding: theme.spacing(1, 2),
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: '1rem',
    opacity: 0.7,
    fontFamily: '"Playfair Display", "Georgia", serif',
  },
  menuItem: {
    borderRadius: '15px',
    marginBottom: theme.spacing(1),
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(45, 90, 61, 0.3)',
      '& .MuiListItemIcon-root': {
        color: '#4a7c59',
      },
    },
  },
  menuItemIcon: {
    color: '#4a7c59',
    minWidth: '40px',
  },
  menuItemText: {
    '& .MuiTypography-root': {
      fontWeight: 500,
      fontSize: '0.95rem',
      fontFamily: '"Playfair Display", "Georgia", serif',
    },
  },
  menuItemNotAuthenticated: {
    '& .MuiListItemText-root .MuiTypography-root': {
      color: '#2c3e50 !important',
      fontWeight: 600,
    },
    '& .MuiListItemIcon-root': {
      color: '#2c3e50 !important',
    },
  },
  menuItemAuthenticated: {
    '& .MuiListItemText-root .MuiTypography-root': {
      color: '#4a7c59',
      fontWeight: 700,
      textShadow: `
        2px 2px 4px rgba(0,0,0,0.3),
        -1px -1px 2px rgba(255,255,255,0.3),
        0 0 10px rgba(74,124,89,0.4)
      `,
      transform: 'perspective(500px) rotateX(15deg)',
      transition: 'all 0.3s ease',
    },
    '& .MuiListItemIcon-root': {
      color: '#4a7c59',
      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
      transform: 'perspective(500px) rotateY(-10deg)',
      transition: 'all 0.3s ease',
    },
    '&:hover': {
      '& .MuiListItemText-root .MuiTypography-root': {
        textShadow: `
          3px 3px 6px rgba(0,0,0,0.4),
          -2px -2px 3px rgba(255,255,255,0.4),
          0 0 15px rgba(74,124,89,0.6)
        `,
        transform: 'perspective(500px) rotateX(20deg) scale(1.05)',
      },
      '& .MuiListItemIcon-root': {
        filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.4))',
        transform: 'perspective(500px) rotateY(-15deg) scale(1.1)',
      },
    },
  },
  lockedItem: {
    opacity: 0.5,
    '&:hover': {
      backgroundColor: 'rgba(45, 90, 61, 0.1)',
    },
    cursor: 'not-allowed !important',
  },
  subMenuItem: {
    padding: theme.spacing(1.5, 4),
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: 'rgba(45, 90, 61, 0.2)',
    },
  },
  subMenuItemIcon: {
    minWidth: '36px',
    color: '#4a7c59',
  },
  subMenuItemText: {
    '& .MuiTypography-root': {
      fontSize: '0.9rem',
      fontFamily: '"Playfair Display", "Georgia", serif',
    },
  },
  actionButtons: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  actionButton: {
    margin: '8px',
    borderRadius: '25px',
    fontWeight: 'bold',
    textTransform: 'none',
    padding: '12px 24px',
    background: 'linear-gradient(45deg, #2d5a3d 30%, #4a7c59 90%)',
    color: '#fff',
    fontFamily: '"Playfair Display", "Georgia", serif',
    '&:hover': {
      background: 'linear-gradient(45deg, #4a7c59 30%, #5d8f6c 90%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(45, 90, 61, 0.4)',
    },
  },
  loginButton: {
    margin: '16px',
    borderRadius: '25px',
    fontWeight: 'bold',
    textTransform: 'none',
    padding: '12px 24px',
    background: 'linear-gradient(45deg, #2d5a3d 30%, #4a7c59 90%)',
    color: '#fff',
    fontFamily: '"Playfair Display", "Georgia", serif',
    '&:hover': {
      background: 'linear-gradient(45deg, #4a7c59 30%, #5d8f6c 90%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(45, 90, 61, 0.4)',
    },
  },
  userInfo: {
    padding: '16px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    textAlign: 'center',
  },
  contactInfo: {
    padding: '16px',
    background: 'rgba(45, 90, 61, 0.2)',
    margin: '8px',
    borderRadius: '12px',
    textAlign: 'center',
  },
  statusBadge: {
    backgroundColor: '#4a7c59',
    color: '#fff',
    borderRadius: '12px',
    padding: '4px 8px',
    marginLeft: theme.spacing(1),
  },
  statusText: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    fontFamily: '"Playfair Display", "Georgia", serif',
  },
  permissionChip: {
    backgroundColor: '#2d5a3d',
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    height: '20px',
    marginLeft: theme.spacing(0.5),
    fontFamily: '"Playfair Display", "Georgia", serif',
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },
  linkItem: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    width: '100%',
  },
  linkButton: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  icon: React.ReactElement;
  text: string;
  path?: string;
  subItems?: SubMenuItem[];
  status?: string;
}

interface SubMenuItem {
  text: string;
  path: string;
}

type ActionButton = {
  icon: React.ReactNode;
  label: string;
  path?: string;
  color?: string;
};

export default function ResponsiveAppBar() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [contactDialog, setContactDialog] = useState(false);
  const { usuario, logout } = useContext(AutenticacaoContext);
  const { hasAreaAccess } = usePermissions();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isAuthenticated = !!usuario?.email;

  const handleLoginClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      setContactDialog(true);
    }
  };

  const hasClienteAccess = isAuthenticated && hasAreaAccess('cliente');
  const hasEmpresarialAccess = isAuthenticated && hasAreaAccess('empresarial');
  const hasColaboradorAccess = isAuthenticated && hasAreaAccess('colaborador');

  const menuSections: MenuSection[] = [
    {
      title: "Todos Serviços",
      items: [
        {
          icon: <People />,
          text: "Área Serviços",
          path: "/servicos"
        },
        {
          icon: <People />,
          text: "Acompanhar Serviços",
          path: "/acompanhamento"
        }
      ]
    },
    {
      title: "Áreas Principais",
      items: [
        ...(hasClienteAccess ? [{
          icon: <Person />,
          text: "Área do Cliente",
          path: "/area-cliente",
          status: "ATIVO"
        }] : []),
        ...(hasEmpresarialAccess ? [{
          icon: <Business />,
          text: "Área Empresarial", 
          path: "/beto/empresas",
          status: "PREMIUM"
        }] : []),
        ...(hasColaboradorAccess ? [{
          icon: <People />,
          text: "Área Colaboradores",
          path: "/colaboradores"
        }] : [])
      ]
    },
    ...(hasEmpresarialAccess || hasColaboradorAccess ? [{
      title: "Gestão",
      items: [
        {
          icon: <Dashboard />,
          text: "Dashboard",
          path: "/beto/dashboard"
        }
      ]
    }] : [])
  ];

  const renderDrawerContent = () => (
    <Box className={classes.drawerContent}>
      <Box className={classes.drawerHeader}>
        <Typography variant="h6" className={classes.drawerTitle}>
          Menu Principal
        </Typography>
        <IconButton onClick={toggleDrawer} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </Box>

      {isAuthenticated ? (
        <Box className={classes.userInfo}>
          <Avatar 
            src={usuario?.imagemUrl ?? ''} 
            className={classes.logoAvatar}
            style={{ width: 60, height: 60, margin: '0 auto 8px' }}
          >
            {usuario?.nome?.charAt(0) ?? 'U'}
          </Avatar>
          <Typography variant="h6" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
            {usuario?.nome ?? 'Usuário'}
          </Typography>
          <Typography variant="caption" style={{ opacity: 0.8 }}>
            {usuario?.email ?? ''}
          </Typography>
          <Box className={classes.chipContainer}>
            <Chip 
              label="Conectado" 
              size="small" 
              className={classes.permissionChip}
              style={{ backgroundColor: '#4a7c59' }}
            />
            {usuario?.permissao && (
              <Chip 
                label={usuario.permissao}
                size="small"
                className={classes.permissionChip}
              />
            )}
          </Box>
        </Box>
      ) : (
        <Box className={classes.contactInfo}>
          <VpnKey style={{ fontSize: 40, color: '#4a7c59', marginBottom: 8 }} />
          <Typography variant="h6" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
            🔐 Login do Sistema
          </Typography>
          <Typography variant="body2" style={{ opacity: 0.9, marginBottom: 16 }}>
            Faça login para acessar o sistema completo
          </Typography>
          <LoginEmailSenha/>
          <Typography variant="caption" style={{ 
            textAlign: 'center', 
            opacity: 0.8, 
            margin: '8px 0',
            fontFamily: '"Playfair Display", "Georgia", serif'
          }}>
            ── ou ──
          </Typography>

          <Link href="/servicos" passHref>
            <Button
              startIcon={<ViewModule />}
              className={classes.loginButton}
              onClick={() => setDrawerOpen(false)}
              fullWidth
            >
              Ver Todos Serviços
            </Button>
          </Link>

          <Button
            startIcon={<FaWhatsapp />}
            className={classes.loginButton}
            onClick={() => setContactDialog(true)}
            style={{
              background: 'linear-gradient(45deg, #25d366 30%, #22c55e 90%)',
              color: '#fff',
              marginTop: '8px'
            }}
            fullWidth
          >
            Solicitar Acesso
          </Button>
        </Box>
      )}

      <List>
        {menuSections.map((section, sectionIndex) => (
          <Box key={sectionIndex}>
            <ListItem className={classes.sectionHeader}>
              <Typography variant="subtitle2" className={classes.sectionTitle}>
                {section.title}
              </Typography>
            </ListItem>
            {section.items.map((item, itemIndex) => (
              <Box key={itemIndex}>
                {item.subItems ? (
                  <>
                    {isAuthenticated ? (
                      <ListItem 
                        button 
                        onClick={() => item.path ? setDrawerOpen(false) : toggleSection(`${sectionIndex}-${itemIndex}`)}
                        className={`${classes.menuItem} ${classes.menuItemAuthenticated}`}
                        {...(item.path ? { component: Link, href: item.path } : {})}
                      >
                        <ListItemIcon className={classes.menuItemIcon}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.text} 
                          className={classes.menuItemText}
                        />
                        {item.status && (
                          <Box className={classes.statusBadge}>
                            <Typography variant="caption" className={classes.statusText}>
                              {item.status}
                            </Typography>
                          </Box>
                        )}
                        {expandedSections[`${sectionIndex}-${itemIndex}`] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                    ) : (
                      <ListItem
                        className={`${classes.menuItem} ${classes.lockedItem}`}
                      >
                        <ListItemIcon className={classes.menuItemIcon}>
                          <Lock />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.text} 
                          className={classes.menuItemText}
                        />
                        <Lock style={{ fontSize: 16, opacity: 0.5 }} />
                      </ListItem>
                    )}
                    <Collapse in={isAuthenticated && !!expandedSections[`${sectionIndex}-${itemIndex}`]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.subItems.map((subItem, subIndex) => (
                          <Link href={subItem.path} passHref key={subIndex}>
                            <ListItem 
                              button 
                              className={classes.subMenuItem}
                              onClick={() => setDrawerOpen(false)}
                            >
                              <ListItemIcon className={classes.subMenuItemIcon}>
                                <Assignment />
                              </ListItemIcon>
                              <ListItemText 
                                primary={subItem.text} 
                                className={classes.subMenuItemText}
                              />
                            </ListItem>
                          </Link>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  (() => {
                    const hasAccess = (
                      item.text === "Área Serviços" || 
                      item.text === "Acompanhar Serviços" ||
                      (isAuthenticated && (
                        (item.text === "Área do Cliente" && hasClienteAccess) ||
                        (item.text === "Área Empresarial" && hasEmpresarialAccess) ||
                        (item.text === "Área Colaboradores" && hasColaboradorAccess) ||
                        (item.text.includes("Dashboard") && hasColaboradorAccess)
                      ))
                    );

                    return hasAccess ? (
                      <Link href={item.path || '/'} passHref>
                        <ListItem 
                          button 
                          className={`${classes.menuItem} ${classes.menuItemAuthenticated}`}
                          onClick={() => setDrawerOpen(false)}
                        >
                          <ListItemIcon className={classes.menuItemIcon}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={item.text} 
                            className={classes.menuItemText}
                          />
                          {item.status && (
                            <Box className={classes.statusBadge}>
                              <Typography variant="caption" className={classes.statusText}>
                                {item.status}
                              </Typography>
                            </Box>
                          )}
                        </ListItem>
                      </Link>
                    ) : (
                      <ListItem className={`${classes.menuItem} ${classes.lockedItem}`}>
                        <ListItemIcon className={classes.menuItemIcon}>
                          <Lock />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.text} 
                          className={classes.menuItemText}
                        />
                        <Lock style={{ fontSize: 16, opacity: 0.5 }} />
                      </ListItem>
                    );
                  })()
                )}
              </Box>
            ))}
          </Box>
        ))}
      </List>
      <Divider style={{ margin: "28px 0", background: "#4a7c5944" }} />

      <Box className={classes.actionButtons}>
        {isAuthenticated ? (
          <>
            {[
              { icon: <FaWhatsapp />, label: "WhatsApp", color: "#25d366" },
              ...(hasClienteAccess ? [{ icon: <Assignment />, label: "Área Cliente", path: "/area-cliente" }] : []),
              ...(hasEmpresarialAccess ? [{ icon: <Business />, label: "Área Empresarial", path: "/beto/empresas" }] : []),
              ...(hasColaboradorAccess ? [{ icon: <Dashboard />, label: "Colaboradores", path: "/colaboradores" }] : [])
            ].map((btn: ActionButton, index) => (
              btn.path ? (
                <Link href={btn.path} passHref key={index}>
                  <Button
                    startIcon={btn.icon}
                    className={classes.actionButton}
                    onClick={() => setDrawerOpen(false)}
                    aria-label={btn.label}
                    fullWidth
                  >
                    {btn.label}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={index}
                  startIcon={btn.icon}
                  className={classes.actionButton}
                  style={{
                    background: `linear-gradient(45deg, ${btn.color} 30%, ${btn.color}dd 90%)`,
                    color: '#fff'
                  }}
                  onClick={() => setContactDialog(true)}
                  aria-label={btn.label}
                  fullWidth
                >
                  {btn.label}
                </Button>
              )
            ))}
            <Divider style={{ margin: "28px 0", background: "#4a7c5944" }} />
            <Button
              startIcon={<ExitToApp />}
              style={{
                background: 'linear-gradient(60deg,#d73232 40%,#b71c1c 120%)',
                color: '#fff',
                fontWeight: 800,
                borderRadius: 22,
                fontSize: 16,
                minWidth: 200,
                fontFamily: '"Playfair Display", "Georgia", serif',
              }}
              onClick={logout}
              aria-label="Sair"
              fullWidth
            >
              Sair do Sistema
            </Button>
          </>
        ) : null}
      </Box>
    </Box>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer} classes={{ paper: classes.drawerPaper }}>
        {renderDrawerContent()}
      </Drawer>

      <Dialog open={contactDialog} onClose={() => setContactDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" style={{ gap: 8 }}>
            <FaWhatsapp color="#25d366" />
            <Typography variant="h6" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
              {isAuthenticated ? 'Atendimento WhatsApp' : 'Solicitar Credenciais de Acesso'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
            {isAuthenticated 
              ? 'Entre em contato conosco pelo WhatsApp para esclarecimentos e atendimento personalizado.'
              : 'Para ter acesso ao sistema do Despachante Beto Dehon, entre em contato conosco pelo WhatsApp. Nossa equipe irá criar suas credenciais de acesso.'
            }
          </Typography>
          <Paper elevation={2} style={{ 
            padding: 16, 
            marginTop: 16, 
            backgroundColor: '#f8f9fa',
            border: '1px solid #4a7c59'
          }}>
            <Typography variant="subtitle2" style={{ color: '#2d5a3d', fontWeight: 'bold' }} gutterBottom>
              📱 Despachante Beto Dehon
            </Typography>
            <Typography variant="body2" style={{ marginBottom: 8 }}>
              🕒 Horário de Atendimento: Segunda a Sexta, 8h às 18h
            </Typography>
            <Typography variant="body2" style={{ marginBottom: 8 }}>
              📍 Atendimento Personalizado
            </Typography>
            {!isAuthenticated && (
              <Typography variant="body2" style={{ 
                color: '#2d5a3d', 
                fontWeight: 'bold',
                marginTop: 8,
                fontFamily: '"Playfair Display", "Georgia", serif'
              }}>
                💼 Mencione que deseja criar uma conta no sistema
              </Typography>
            )}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContactDialog(false)}>
            Fechar
          </Button>
          <Button 
            variant="contained" 
            startIcon={<FaWhatsapp />}
            onClick={() => {
              const message = isAuthenticated 
                ? 'Olá! Gostaria de informações sobre os serviços do Despachante Beto Dehon.'
                : 'Olá! Gostaria de solicitar acesso ao sistema do Despachante Beto Dehon. Preciso criar uma conta para utilizar os serviços online.';
              window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, '_blank');
              setContactDialog(false);
            }}
            style={{
              background: 'linear-gradient(45deg, #25d366 30%, #22c55e 90%)',
              color: '#fff',
              fontFamily: '"Playfair Display", "Georgia", serif'
            }}
          >
            Abrir WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
