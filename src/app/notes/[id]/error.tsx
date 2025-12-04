'use client';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div style={{ padding: '40px', textAlign: 'center', color: '#d32f2f' }}>
      <h2>Error</h2>
      <p>Could not fetch note details. {error.message}</p>
    </div>
  );
}