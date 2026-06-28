const BASE = 'http://localhost:5000/api/blogposts';

export const getPosts = () => fetch(BASE).then(r => r.json());
export const getPost = (id) => fetch(`${BASE}/${id}`).then(r => r.json());
export const createPost = (data) => fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
export const updatePost = (id, data) => fetch(`${BASE}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
export const deletePost = (id) => fetch(`${BASE}/${id}`, { method: 'DELETE' });
