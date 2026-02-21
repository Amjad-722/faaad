import { useEffect, useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { api } from '../api/client';
import { useAsync } from '../hooks/useAsync';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Input, { Textarea } from '../components/ui/Input';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { data: settings, execute: loadSettings } = useAsync(api.settings.get);
  const { data: logs, execute: loadLogs } = useAsync(api.sms.logs);
  const { data: stats, execute: loadStats } = useAsync(api.sms.stats);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');

  useEffect(() => {
    loadSettings();
    loadLogs();
    loadStats();
  }, []);

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.settings.update(form);
      toast.success('Settings saved');
    } catch { /* handled */ }
    setSaving(false);
  };

  const logColumns = [
    {
      key: 'sent_at',
      label: 'Sent At',
      render: (val) => new Date(val).toLocaleString(),
    },
    { key: 'client_name', label: 'Client', render: (val) => val || '—' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'message',
      label: 'Message',
      render: (val) => (
        <span className="block max-w-xs truncate" title={val}>{val}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <Badge status={val} />,
    },
    {
      key: 'error',
      label: 'Error',
      render: (val) => val ? <span className="text-red-500 text-xs">{val}</span> : '—',
    },
  ];

  const tabs = [
    { id: 'settings', label: 'Settings' },
    { id: 'sms-logs', label: 'SMS Logs' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-900">Settings & SMS Logs</h1>
        <p className="text-primary-500 mt-1">Configure reminders and view SMS history</p>
      </div>

      <div className="flex gap-1 bg-primary-100 p-1 rounded-lg w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-primary-900 shadow-sm'
                : 'text-primary-500 hover:text-primary-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'settings' && (
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-primary-900">Reminder Configuration</h2>
          </CardHeader>
          <CardBody className="space-y-4 max-w-2xl">
            <Input
              label="Business Name"
              value={form.business_name || ''}
              onChange={(e) => handleChange('business_name', e.target.value)}
            />
            <Input
              label="Business Phone"
              value={form.business_phone || ''}
              onChange={(e) => handleChange('business_phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
            />
            <Input
              label="Days Before Appointment to Send Reminder"
              type="number"
              min="1"
              max="7"
              value={form.reminder_days_before || '1'}
              onChange={(e) => handleChange('reminder_days_before', e.target.value)}
            />
            <Textarea
              label="SMS Message Template"
              value={form.reminder_message_template || ''}
              onChange={(e) => handleChange('reminder_message_template', e.target.value)}
            />
            <p className="text-xs text-primary-400">
              Available placeholders: {'{name}'}, {'{service}'}, {'{date}'}, {'{time}'}
            </p>

            <div className="flex justify-end pt-2">
              <Button onClick={handleSave}>
                <Save size={16} /> Save Settings
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {activeTab === 'sms-logs' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardBody className="text-center">
                <p className="text-sm text-primary-500">Total Sent</p>
                <p className="text-3xl font-bold text-green-600">{stats?.sent || 0}</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <p className="text-sm text-primary-500">Failed</p>
                <p className="text-3xl font-bold text-red-500">{stats?.failed || 0}</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <p className="text-sm text-primary-500">Pending</p>
                <p className="text-3xl font-bold text-accent-500">{stats?.pending || 0}</p>
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <h2 className="font-semibold text-primary-900">SMS History</h2>
              <Button variant="ghost" size="sm" onClick={() => { loadLogs(); loadStats(); }}>
                <RefreshCw size={14} /> Refresh
              </Button>
            </CardHeader>
            <Table columns={logColumns} data={logs || []} emptyMessage="No SMS messages sent yet" />
          </Card>
        </>
      )}
    </div>
  );
}
