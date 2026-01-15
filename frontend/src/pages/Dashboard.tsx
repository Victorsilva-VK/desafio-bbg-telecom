import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { type Ticket, type PaginatedResponse } from '../types';
import { LogOut, Plus, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export function Dashboard() {
  const { user, signOut } = useContext(AuthContext);
  
  // Estados da Aplicação
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Estado do Formulário de Novo Ticket
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState('BAIXA');

  // Carregar Tickets (sempre que mudar a página)
  useEffect(() => {
    loadTickets();
  }, [page]);

  async function loadTickets() {
    setLoading(true);
    try {
      const response = await api.get<PaginatedResponse>(`/tickets?page=${page}&limit=5`);
      setTickets(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      alert('Erro ao carregar chamados');
    } finally {
      setLoading(false);
    }
  }

  // Criar Novo Ticket
  async function handleCreateTicket(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post('/tickets', {
        title: newTitle,
        description: newDesc,
        priority: newPriority
      });
      setShowModal(false);
      setNewTitle('');
      setNewDesc('');
      loadTickets(); // Recarrega a lista
    } catch (error) {
      alert('Erro ao criar chamado.');
    }
  }

  // Atualizar Status (Regra de Negócio visual)
  async function handleStatusChange(id: number, currentStatus: string) {
    if (currentStatus === 'CONCLUIDO') {
      alert('Este chamado já foi finalizado e não pode ser alterado.');
      return;
    }

    const nextStatus = currentStatus === 'ABERTO' ? 'EM_PROGRESSO' : 'CONCLUIDO';
    
    if (!confirm(`Deseja alterar o status para ${nextStatus}?`)) return;

    try {
      await api.put(`/tickets/${id}`, { status: nextStatus });
      loadTickets();
    } catch (error) {
      alert('Erro ao atualizar status.');
    }
  }

  // Função auxiliar para cor da prioridade
  const getPriorityColor = (p: string) => {
    if (p === 'ALTA') return 'text-red-600 bg-red-100';
    if (p === 'MEDIA') return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Painel de Tickets</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Olá, <strong>{user?.role}</strong></span>
            <button onClick={signOut} className="text-red-500 hover:text-red-700 flex items-center gap-1">
              <LogOut size={18} /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Botão Novo Ticket */}
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Meus Chamados</h2>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={20} /> Novo Chamado
          </button>
        </div>

        {/* Lista de Tickets */}
        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : (
          <div className="grid gap-4">
            {tickets.map(ticket => (
              <div key={ticket.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      {ticket.title}
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </h3>
                    <p className="text-gray-600 mt-1">{ticket.description}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Criado por: {ticket.cliente?.name || 'Mim'} em {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {/* Botão de Status */}
                  <button 
                    onClick={() => handleStatusChange(ticket.id, ticket.status)}
                    disabled={ticket.status === 'CONCLUIDO'}
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 border
                      ${ticket.status === 'ABERTO' ? 'border-yellow-500 text-yellow-600 hover:bg-yellow-50' : ''}
                      ${ticket.status === 'EM_PROGRESSO' ? 'border-blue-500 text-blue-600 hover:bg-blue-50' : ''}
                      ${ticket.status === 'CONCLUIDO' ? 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50' : ''}
                    `}
                  >
                    {ticket.status === 'ABERTO' && <><AlertCircle size={14}/> Aberto</>}
                    {ticket.status === 'EM_PROGRESSO' && <><Clock size={14}/> Em Progresso</>}
                    {ticket.status === 'CONCLUIDO' && <><CheckCircle size={14}/> Concluído</>}
                  </button>
                </div>
              </div>
            ))}

            {tickets.length === 0 && (
              <p className="text-center text-gray-500 py-10">Nenhum chamado encontrado.</p>
            )}
          </div>
        )}

        {/* Paginação */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
            className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
          <span className="text-gray-600">Página {page} de {totalPages}</span>
          <button 
            disabled={page === totalPages || totalPages === 0} 
            onClick={() => setPage(page + 1)}
            className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      </main>

      {/* Modal Novo Ticket (Simples) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Abrir Novo Chamado</h2>
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <input 
                type="text" 
                placeholder="Título do problema" 
                required
                className="w-full border p-2 rounded"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
              <textarea 
                placeholder="Descrição detalhada" 
                required
                className="w-full border p-2 rounded h-24"
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
              />
              <select 
                className="w-full border p-2 rounded"
                value={newPriority}
                onChange={e => setNewPriority(e.target.value)}
              >
                <option value="BAIXA">Prioridade Baixa</option>
                <option value="MEDIA">Prioridade Média</option>
                <option value="ALTA">Prioridade Alta</option>
              </select>
              
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}