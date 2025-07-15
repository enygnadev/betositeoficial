'use client';
import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import {
  FaFileAlt, FaTachometerAlt, FaBars, FaPhone, FaChartPie, FaUserTie,
  FaStore, FaCrown, FaTrophy, FaStar, FaGem, FaMagic, FaRocket, FaCog, FaCopy, FaChevronDown
} from 'react-icons/fa';
import Forcaautenticacao from '@/components/autenticacao/ForcarAutenticacao';

interface MenuItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  premium?: boolean;
  exclusive?: boolean;
}

interface MenuSection {
  section: string;
  items: MenuItem[];
  color: string;
  icon: React.ReactNode;
}

const NavigationButtons: React.FC = memo(() => {
  const baseUrl = 'https://betositeoficial.vercel.app';
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [showToast, setShowToast] = useState(false);

  const toggleSection = (section: string) =>
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));

  const copyToClipboard = async (path: string) => {
    try {
      await navigator.clipboard.writeText(`${baseUrl}${path}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const menuSections: MenuSection[] = [
    {
      section: 'Tubarão',
      color: 'from-emerald-600 to-teal-700',
      icon: <FaRocket />,
      items: [
        { href: '/beto/requerimento', icon: <FaFileAlt />, label: 'Requerimento loja', premium: true },
        { href: '/beto/dashboard', icon: <FaTachometerAlt />, label: 'Painel Executivo', premium: true, exclusive: true },
        { href: '/beto/empresas', icon: <FaBars />, label: 'Centro Empresarial' },
      ],
    },
    {
      section: 'Serviços Digitais',
      color: 'from-green-600 to-emerald-700',
      icon: <FaMagic />,
      items: [
        { href: '/beto/requerimento/digital', icon: <FaPhone />, label: 'Requerimento Digital', premium: true },
        { href: '/beto/dashboard/digital', icon: <FaChartPie />, label: 'Painel Digital', premium: true, exclusive: true },
        { href: '/beto/digital/empresas', icon: <FaUserTie />, label: 'Digital Empresarial' },
      ],
    },
    {
      section: 'Transferências',
      color: 'from-amber-600 to-yellow-700',
      icon: <FaTrophy />,
      items: [
        { href: '/beto/transferencia', icon: <FaStore />, label: 'Transferências', premium: true },
        { href: '/beto/transferencia/dashboard', icon: <FaChartPie />, label: 'Painel Avançado', premium: true, exclusive: true },
      ],
    },
    {
      section: 'Anuência',
      color: 'from-indigo-600 to-purple-700',
      icon: <FaCog />,
      items: [
        { href: '/beto/anuencia', icon: <FaCog />, label: 'Gestão Anuência', premium: true },
        { href: '/beto/anuencia/dashboard', icon: <FaChartPie />, label: 'Controle Elite', premium: true, exclusive: true },
        { href: '/', icon: <FaCrown />, label: 'Portal Premium', premium: true },
      ],
    },
  ];

  return (
    <Forcaautenticacao>
      <div className="min-h-screen bg-gradient-to-b from-zinc-100 via-white to-zinc-200 font-['Playfair_Display','Poppins']">
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-md shadow-lg"
          >
            <FaGem className="inline mr-2" />
            Link copiado com sucesso!
          </motion.div>
        )}

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-14">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-600 to-green-700 rounded-full shadow-lg mb-6"
            >
              <FaCrown className="text-white text-3xl" />
            </motion.div>
            <h1 className="text-5xl font-bold text-gray-900 mb-3">Despachante Beto Dehon</h1>
            <p className="text-lg text-gray-600">Atendimento exclusivo com excelência e sofisticação</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {menuSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="rounded-2xl border border-zinc-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`p-5 bg-gradient-to-r ${section.color} text-white flex items-center justify-between rounded-t-2xl cursor-pointer`}
                  onClick={() => toggleSection(section.section)}
                >
                  <div className="flex items-center gap-3 text-lg font-semibold">
                    {section.icon}
                    {section.section}
                  </div>
                  <FaChevronDown className={`transition-transform ${expandedSections[section.section] ? 'rotate-180' : ''}`} />
                </div>

                {expandedSections[section.section] && (
                  <div className="p-5 space-y-4">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-2">
                        <a
                          href={item.href}
                          className="flex items-center gap-3 flex-1 px-4 py-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-200 hover:border-emerald-500 transition"
                        >
                          <span className="text-xl text-emerald-600">{item.icon}</span>
                          <div>
                            <p className="font-semibold text-gray-800">{item.label}</p>
                            <div className="text-xs mt-1 flex gap-2">
                              {item.premium && (
                                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                  <FaGem className="text-xs" /> Premium
                                </span>
                              )}
                              {item.exclusive && (
                                <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                  <FaTrophy className="text-xs" /> Exclusivo
                                </span>
                              )}
                            </div>
                          </div>
                        </a>
                        <button
                          onClick={() => copyToClipboard(item.href)}
                          className="p-2 bg-zinc-200 hover:bg-emerald-500 text-zinc-700 hover:text-white rounded transition"
                        >
                          <FaCopy size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center text-sm text-gray-500">
            <p className="inline-flex items-center gap-2">
              <FaTrophy className="text-emerald-500" />
              © 2024 Despachante Beto Dehon – Todos os direitos reservados
              <FaTrophy className="text-emerald-500" />
            </p>
          </div>
        </div>
      </div>
    </Forcaautenticacao>
  );
});

NavigationButtons.displayName = 'NavigationButtons';
export default NavigationButtons;
