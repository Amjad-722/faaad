import { useEffect, useState, useCallback } from 'react';
import { Calendar, Users, MessageSquare, Clock, Plus, Send, Trash2, Edit2 } from 'lucide-react';
import { api } from '../api/client';
import { useAsync } from '../hooks/useAsync';
import { useForm } from '../hooks/useForm';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Input, { Select } from '../components/ui/Input';
import toast from 'react-hot-toast';

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <Card>
      <CardBody className="flex items-center gap-4">
        <div className={`rounded-lg p-3 ${color}`}>
          <Icon size={22} className="text-white" />
        </div>
        <div>
          <p className="text-sm text-primary-500">{label}</p>
          <p className="text-2xl font-bold text-primary-900">{value}</p>
        </div>
      </CardBody>
    </Card>
  );
}

const apptColumns = [
  { key: 'client_name', label: 'Client' },
  { key: 'date', label: 'Date' },
  { key: 'time', label: 'Time' },
  { key: 'service', label: 'Service' },
  {
    key: 'status',
    label: 'Status',
    render: (val) => <Badge status={val} />,
  },
  {
    key: 'reminder_sent',
    label: 'Reminder',
    render: (val) => (
      <Badge status={val ? 'sent' : 'pending'} />
    ),
  },
  {
    key: 'actions',
    label: '',
    render: (_, row) => row._actions,
  },
];

function validateAppointment(values) {
  const errors = {};
  if (!values.client_id) errors.client_id = 'Client is required';
  if (!values.date) errors.date = 'Date is required';
  if (!values.time) errors.time = 'Time is required';
  return errors;
}

export default function Dashboard() {
  const { data: appointments, execute: loadAppointments } = useAsync(api.appointments.list);
  const { data: clients, execute: loadClients } = useAsync(api.clients.list);
  const { data: smsStats, execute: loadSmsStats } = useAsync(api.sms.stats);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const form = useForm(
    { client_id: '', date: '', time: '', service: 'Haircut' },
    validateAppointment
  );

  useEffect(() => {
    loadAppointments();
    loadClients();
    loadSmsStats();
  }, []);

  const openNew = () => {
    setEditing(null);
    form.reset({ client_id: '', date: '', time: '', service: 'Haircut' });
    setShowModal(true);
  };

  const openEdit = (appt) => {
    setEditing(appt);
    form.reset({
      client_id: String(appt.client_id),
      date: appt.date,
      time: appt.time,
      service: appt.service,
    });
    setShowModal(true);
  };

  const handleSave = form.handleSubmit(async (values) => {
    setSaving(true);
    try {
      if (editing) {
        await api.appointments.update(editing.id, values);
        toast.success('Appointment updated');
      } else {
        await api.appointments.create(values);
        toast.success('Appointment created');
      }
      setShowModal(false);
      loadAppointments();
    } catch { /* useAsync handles error toast */ }
    setSaving(false);
  });

  const handleDelete = async (id) => {
    if (!confirm('Delete this appointment?')) return;
    await api.appointments.delete(id);
    toast.success('Appointment deleted');
    loadAppointments();
  };

  const handleSendReminder = async (id) => {
    await api.sms.sendReminder(id);
    toast.success('Reminder sent!');
    loadAppointments();
    loadSmsStats();
  };

  const tableData = (appointments || []).map(a => ({
    ...a,
    _actions: (
      <div className="flex gap-1">
        <button onClick={(e) => { e.stopPropagation(); handleSendReminder(a.id); }}
          className="p-1.5 rounded hover:bg-secondary-50 text-secondary-500" title="Send reminder">
          <Send size={15} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); openEdit(a); }}
          className="p-1.5 rounded hover:bg-primary-100 text-primary-500" title="Edit">
          <Edit2 size={15} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleDelete(a.id); }}
          className="p-1.5 rounded hover:bg-red-50 text-red-400" title="Delete">
          <Trash2 size={15} />
        </button>
      </div>
    ),
  }));

  const todayStr = new Date().toISOString().split('T')[0];
  const todayCount = (appointments || []).filter(a => a.date === todayStr).length;
  const upcomingCount = (appointments || []).filter(a => a.date >= todayStr && a.status === 'scheduled').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary-900">Dashboard</h1>
          <p className="text-primary-500 mt-1">Manage appointments and reminders</p>
        </div>
        <Button onClick={openNew}>
          <Plus size={16} /> New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Calendar} label="Today" value={todayCount} color="bg-secondary-500" />
        <StatCard icon={Clock} label="Upcoming" value={upcomingCount} color="bg-accent-500" />
        <StatCard icon={Users} label="Clients" value={clients?.length || 0} color="bg-primary-600" />
        <StatCard icon={MessageSquare} label="SMS Sent" value={smsStats?.sent || 0} color="bg-green-500" />
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <h2 className="font-semibold text-primary-900">Appointments</h2>
        </CardHeader>
        <Table columns={apptColumns} data={tableData} emptyMessage="No appointments yet" />
      </Card>

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Appointment' : 'New Appointment'}>
        <form onSubmit={handleSave} className="space-y-4">
          <Select
            label="Client"
            name="client_id"
            value={form.values.client_id}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.client_id && form.errors.client_id}
          >
            <option value="">Select a client...</option>
            {(clients || []).map(c => (
              <option key={c.id} value={c.id}>{c.name} — {c.phone}</option>
            ))}
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              name="date"
              value={form.values.date}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.date && form.errors.date}
            />
            <Input
              label="Time"
              type="time"
              name="time"
              value={form.values.time}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.time && form.errors.time}
            />
          </div>

          <Input
            label="Service"
            name="service"
            value={form.values.service}
            onChange={form.handleChange}
            placeholder="e.g. Haircut, Beard Trim"
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editing ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
