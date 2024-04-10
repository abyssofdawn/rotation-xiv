import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {

return (
  <div className="padded">
    <h1>Hello, Next.js!</h1>
    <button type="button">
      Dashboard
    </button>
  </div>
);
}