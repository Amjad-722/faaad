function load(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function nextId(items) {
  return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
}

function loadObj(key, defaults = {}) {
  try { return JSON.parse(localStorage.getItem(key)) || defaults; }
  catch { return defaults; }
}

const DEFAULT_SETTINGS = {
  business_name: 'My Barbershop',
  business_phone: '',
  reminder_days_before: '1',
  reminder_message_template:
    'Hi {name}, this is a reminder for your {service} appointment on {date} at {time}. Reply CONFIRM to confirm or call us to reschedule.',
};

export const api = {
  clients: {
    list(q) {
      let clients = load('clients');
      if (q) {
        const lq = q.toLowerCase();
        clients = clients.filter(c =>
          c.name.toLowerCase().includes(lq) || c.phone.includes(lq)
        );
      }
      const appts = load('appointments');
      return clients.map(c => ({
        ...c,
        appointment_count: appts.filter(a => a.client_id === c.id).length,
      }));
    },
    get(id) {
      return load('clients').find(c => c.id === id) || null;
    },
    create(data) {
      const clients = load('clients');
      const client = {
        id: nextId(clients),
        name: data.name,
        phone: data.phone,
        email: data.email || '',
        notes: data.notes || '',
        created_at: new Date().toISOString(),
      };
      clients.push(client);
      save('clients', clients);
      return client;
    },
    update(id, data) {
      const clients = load('clients');
      const idx = clients.findIndex(c => c.id === id);
      if (idx === -1) throw new Error('Client not found');
      clients[idx] = { ...clients[idx], ...data, updated_at: new Date().toISOString() };
      save('clients', clients);
      return clients[idx];
    },
    delete(id) {
      save('clients', load('clients').filter(c => c.id !== id));
      save('appointments', load('appointments').filter(a => a.client_id !== id));
    },
  },

  appointments: {
    list(params = {}) {
      let appts = load('appointments');
      const clients = load('clients');
      const clientMap = Object.fromEntries(clients.map(c => [c.id, c]));

      if (params.status) appts = appts.filter(a => a.status === params.status);
      if (params.from) appts = appts.filter(a => a.date >= params.from);
      if (params.to) appts = appts.filter(a => a.date <= params.to);

      appts.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

      return appts.map(a => ({
        ...a,
        client_name: clientMap[a.client_id]?.name || 'Unknown',
        client_phone: clientMap[a.client_id]?.phone || '',
      }));
    },
    get(id) {
      return load('appointments').find(a => a.id === id) || null;
    },
    create(data) {
      const appts = load('appointments');
      const appt = {
        id: nextId(appts),
        client_id: Number(data.client_id),
        date: data.date,
        time: data.time,
        service: data.service || 'Haircut',
        status: 'scheduled',
        reminder_sent: 0,
        created_at: new Date().toISOString(),
      };
      appts.push(appt);
      save('appointments', appts);
      return appt;
    },
    update(id, data) {
      const appts = load('appointments');
      const idx = appts.findIndex(a => a.id === id);
      if (idx === -1) throw new Error('Appointment not found');
      appts[idx] = { ...appts[idx], ...data };
      save('appointments', appts);
      return appts[idx];
    },
    delete(id) {
      save('appointments', load('appointments').filter(a => a.id !== id));
    },
  },

  sms: {
    logs() {
      return load('sms_logs').sort((a, b) => b.sent_at.localeCompare(a.sent_at));
    },
    stats() {
      const logs = load('sms_logs');
      return {
        total: logs.length,
        sent: logs.filter(l => l.status === 'sent').length,
        failed: logs.filter(l => l.status === 'failed').length,
        pending: logs.filter(l => l.status === 'pending').length,
      };
    },
    sendReminder(appointmentId) {
      const appts = load('appointments');
      const clients = load('clients');
      const appt = appts.find(a => a.id === appointmentId);
      if (!appt) throw new Error('Appointment not found');
      const client = clients.find(c => c.id === appt.client_id);
      if (!client) throw new Error('Client not found');

      const settings = loadObj('settings', DEFAULT_SETTINGS);
      const message = (settings.reminder_message_template || DEFAULT_SETTINGS.reminder_message_template)
        .replace('{name}', client.name)
        .replace('{service}', appt.service)
        .replace('{date}', appt.date)
        .replace('{time}', appt.time);

      const logs = load('sms_logs');
      const log = {
        id: nextId(logs),
        client_id: client.id,
        client_name: client.name,
        appointment_id: appt.id,
        phone: client.phone,
        message,
        status: 'sent',
        sent_at: new Date().toISOString(),
      };
      logs.push(log);
      save('sms_logs', logs);

      const aIdx = appts.findIndex(a => a.id === appointmentId);
      appts[aIdx].reminder_sent = 1;
      save('appointments', appts);

      return log;
    },
  },

  settings: {
    get() {
      return loadObj('settings', DEFAULT_SETTINGS);
    },
    update(data) {
      const current = loadObj('settings', DEFAULT_SETTINGS);
      const updated = { ...current, ...data };
      localStorage.setItem('settings', JSON.stringify(updated));
      return updated;
    },
  },
};
