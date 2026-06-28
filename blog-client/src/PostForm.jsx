import { useState, useEffect } from 'react';

export default function PostForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({ title: '', content: '', author: '', ...initial });

  useEffect(() => {
    if (initial) setForm({ title: initial.title, content: initial.content, author: initial.author });
  }, [initial]);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <input name="title" placeholder="Title" value={form.title} onChange={handle} required style={inputStyle} />
      <input name="author" placeholder="Author" value={form.author} onChange={handle} required style={inputStyle} />
      <textarea name="content" placeholder="Content" value={form.content} onChange={handle} required rows={6} style={{ ...inputStyle, resize: 'vertical' }} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" style={btnStyle('#3b82f6')}>Save</button>
        {onCancel && <button type="button" onClick={onCancel} style={btnStyle('#6b7280')}>Cancel</button>}
      </div>
    </form>
  );
}

const inputStyle = { padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14, width: '100%', boxSizing: 'border-box' };
const btnStyle = color => ({ padding: '8px 18px', background: color, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 });
