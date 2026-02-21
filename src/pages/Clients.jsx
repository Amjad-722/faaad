import { useEffect, useState, useCallback } from 'react';
import { Plus, Search, Edit2, Trash2, Phone } from 'lucide-react';
import { api } from '../api/client';
import { useAsync } from '../hooks/useAsync';
import { useForm } from '../hooks/useForm';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import Input, { Textarea } from '../components/ui/Input';
import toast from 'react-hot-toast';

function validateClient(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required';
  if (!values.phone.trim()) errors.phone = 'Phone is required';
  else if (!/^\+?[\d\s()-]{7,20}$/.test(values.phone)) errors.phone = 'Invalid phone format';
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Invalid email';
  return errors;
}

const emptyClient = { name: '', phone: '', email: '', notes: '' };

export default function Clients() {
  const { data: clients, execute: loadClients } = useAsync(api.clients.list);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');

  const form = useForm(emptyClient, validateClient);

  useEffect(() => { loadClients(); }, []);

  const openNew = () => {
    setEditing(null);
    form.reset(emptyClient);
    setShowModal(true);
  };

  const openEdit = (client) => {
    setEditing(client);
    form.reset({
      name: client.name,
      phone: client.phone,
      email: client.email || '',
      notes: client.notes || '',
    });
    setShowModal(true);
  };

  const handleSave = form.handleSubmit((values) => {
    try {
      if (editing) {
        api.clients.update(editing.id, values);
        toast.success('Client updated');
      } else {
        api.clients.create(values);
        toast.success('Client added');
      }
      setShowModal(false);
      loadClients();
    } catch { /* handled */ }
  });

  const handleDelete = (id) => {
    if (!confirm('Delete this client? Their appointments will also be removed.')) return;
    api.clients.delete(id);
    toast.success('Client deleted');
    loadClients();
  };

  const handleSearch = useCallback((e) => {
    const q = e.target.value;
    setSearch(q);
    if (q.length >= 2) {
      loadClients(q);
    } else if (q.length === 0) {
      loadClients();
    }
  }, [loadClients]);

  const columns = [
    { key: 'name', label: 'Name', render: (val) => <span className="font-medium text-primary-900">{val}</span> },
    {
      key: 'phone',
      label: 'Phone',
      render: (val) => (
        <span className="flex items-center gap-1.5">
          <Phone size={13} className="text-primary-400" /> {val}
        </span>
      ),
    },
    { key: 'email', label: 'Email', render: (val) => val || <span className="text-primary-300 italic">—</span> },
    { key: 'appointment_count', label: 'Appointments' },
    {
      key: 'actions',
      label: '',
      render: (_, row) => (
        <div className="flex gap-1">
          <button onClick={(e) => { e.stopPropagation(); openEdit(row); }}
            className="p-1.5 rounded-lg hover:bg-primary-100 text-primary-500" title="Edit">
            <Edit2 size={15} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleDelete(row.id); }}
            className="p-1.5 rounded-lg hover:bg-red-50 text-red-400" title="Delete">
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-primary-900">Clients</h1>
          <p className="text-primary-500 mt-1 tracking-wide">Manage your client portfolio</p>
        </div>
        <Button onClick={openNew}>
          <Plus size={16} /> Add Client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search clients by name or phone..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-primary-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-500 transition-all"
            />
          </div>
        </CardHeader>
        <Table columns={columns} data={clients || []} emptyMessage="No clients yet — add your first one" />
      </Card>

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Client' : 'Add Client'}>
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.name && form.errors.name}
            placeholder="John Doe"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={form.values.phone}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.phone && form.errors.phone}
            placeholder="+1 (555) 123-4567"
          />
          <Input
            label="Email (optional)"
            name="email"
            type="email"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.email && form.errors.email}
            placeholder="john@example.com"
          />
          <Textarea
            label="Notes (optional)"
            name="notes"
            value={form.values.notes}
            onChange={form.handleChange}
            placeholder="Preferred styles, preferences, etc."
          />

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" type="button" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editing ? 'Update' : 'Add Client'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
