'use client';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
      <p>Could not fetch the list of notes. {error.message}</p>
    </div>
  );
}