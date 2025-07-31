// PUBLIC_INTERFACE
export const defaultTemplate = `function MyComponent({ name = "World", count = 0 }) {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#61dafb' }}>Hello, {name}!</h1>
      <p>Count: {count}</p>
      <button 
        onClick={() => alert('Button clicked!')}
        style={{
          backgroundColor: '#61dafb',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Click me!
      </button>
    </div>
  );
}`;

// PUBLIC_INTERFACE
export const hooksTemplate = `function MyComponent({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(\`Count is \${count}\`);
  }, [count]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2 style={{ color: '#61dafb' }}>React Hooks Example</h2>
      <p>{message}</p>
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => setCount(count - 1)}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            margin: '0 5px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          -
        </button>
        <span style={{ margin: '0 20px', fontSize: '20px', fontWeight: 'bold' }}>
          {count}
        </span>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            margin: '0 5px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}`;

// PUBLIC_INTERFACE
export const formTemplate = `function MyComponent({ title = "Contact Form" }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(\`Form submitted: \${JSON.stringify(formData, null, 2)}\`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ color: '#61dafb', textAlign: 'center' }}>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#61dafb',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}`;

// PUBLIC_INTERFACE
export const templates = {
  default: {
    name: 'Basic Component',
    code: defaultTemplate,
    props: { name: 'World', count: 0 }
  },
  hooks: {
    name: 'Hooks Example',
    code: hooksTemplate,
    props: { initialCount: 0 }
  },
  form: {
    name: 'Form Component',
    code: formTemplate,
    props: { title: 'Contact Form' }
  }
};
