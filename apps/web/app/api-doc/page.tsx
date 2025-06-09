import { ApiReferenceReact } from '@scalar/api-reference-react'
import '@scalar/api-reference/style.css';

export default function References() {
  return (
    <ApiReferenceReact
      configuration={{
        url: 'api/openapi',
        darkMode: false,
        hideDarkModeToggle: true,
      }}
    />
  )
}