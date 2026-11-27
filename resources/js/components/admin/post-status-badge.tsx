import { Badge } from '@/components/ui/badge';
import type { PostStatus } from '@/types';

const LABELS: Record<PostStatus, string> = {
  draft: 'Draft',
  scheduled: 'Scheduled',
  published: 'Published',
};

export default function PostStatusBadge({ status }: { status: PostStatus }) {
  return <Badge variant={status === 'published' ? 'default' : 'outline'}>{LABELS[status]}</Badge>;
}
