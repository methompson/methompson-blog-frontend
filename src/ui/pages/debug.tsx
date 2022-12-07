import { StandardPage } from '@/src/ui/components/standard_page';

import { DebugButtonColumn } from '@/src/ui/components/debug/debug_buttons';

export function DebugPage() {
  return (
    <StandardPage>
      <DebugButtonColumn />
    </StandardPage>
  );
}