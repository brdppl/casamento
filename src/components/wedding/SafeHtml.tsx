import DOMPurify from 'isomorphic-dompurify';

interface Props {
  content: string;
}

export function SafeHtml({ content }: Props) {
  const withBreaks = content.replace(/\n/g, '<br />');

  const sanitized = DOMPurify.sanitize(withBreaks, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });

  return (
    <div
      className="prose prose-neutral max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
