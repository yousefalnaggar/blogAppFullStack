import { useState, useEffect, useCallback } from 'react';
import { getPosts, createPost, updatePost, deletePost } from './api';
import PostForm from './PostForm';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState('list'); // list | create | edit | view
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try { setPosts(await getPosts()); } catch { setError('Failed to load posts.'); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (data) => {
    await createPost(data);
    setMode('list');
    load();
  };

  const handleUpdate = async (data) => {
    await updatePost(selected.id, data);
    setSelected(null);
    setMode('list');
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    await deletePost(id);
    if (mode === 'view') setMode('list');
    load();
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 16px', fontFamily: 'system-ui, sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>📝 Blog</h1>
        {mode === 'list' && (
          <button onClick={() => setMode('create')} style={btn('#3b82f6')}>+ New Post</button>
        )}
        {mode !== 'list' && (
          <button onClick={() => { setMode('list'); setSelected(null); }} style={btn('#6b7280')}>← Back</button>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {mode === 'create' && (
        <div style={card}>
          <h2 style={{ marginTop: 0 }}>New Post</h2>
          <PostForm onSubmit={handleCreate} />
        </div>
      )}

      {mode === 'edit' && selected && (
        <div style={card}>
          <h2 style={{ marginTop: 0 }}>Edit Post</h2>
          <PostForm initial={selected} onSubmit={handleUpdate} onCancel={() => { setMode('list'); setSelected(null); }} />
        </div>
      )}

      {mode === 'view' && selected && (
        <div style={card}>
          <h2 style={{ marginTop: 0 }}>{selected.title}</h2>
          <p style={{ color: '#6b7280', fontSize: 13, marginTop: -8 }}>
            By <strong>{selected.author}</strong> &bull; {new Date(selected.createdAt).toLocaleDateString()}
          </p>
          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '12px 0' }} />
          <p style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{selected.content}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={() => setMode('edit')} style={btn('#f59e0b')}>Edit</button>
            <button onClick={() => handleDelete(selected.id)} style={btn('#ef4444')}>Delete</button>
          </div>
        </div>
      )}

      {mode === 'list' && (
        loading ? <p>Loading…</p> :
        posts.length === 0 ? <p style={{ color: '#6b7280' }}>No posts yet. Create one!</p> :
        posts.map(p => (
          <div key={p.id} style={{ ...card, cursor: 'pointer', marginBottom: 12 }}
            onClick={() => { setSelected(p); setMode('view'); }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 4px' }}>{p.title}</h3>
                <p style={{ margin: 0, color: '#6b7280', fontSize: 13 }}>
                  By {p.author} &bull; {new Date(p.createdAt).toLocaleDateString()}
                </p>
                <p style={{ margin: '8px 0 0', color: '#374151' }}>
                  {p.content.length > 120 ? p.content.slice(0, 120) + '…' : p.content}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 6, marginLeft: 12, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                <button onClick={() => { setSelected(p); setMode('edit'); }} style={btn('#f59e0b')}>Edit</button>
                <button onClick={() => handleDelete(p.id)} style={btn('#ef4444')}>Delete</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const card = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,.05)' };
const btn = color => ({ padding: '7px 14px', background: color, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 });
