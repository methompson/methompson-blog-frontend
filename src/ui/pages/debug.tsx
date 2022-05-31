import React from 'react';

import StandardPage from '@src/ui/components/standard_page';

import { DebugButtonColumn } from '@src/ui/components/debug/debug_buttons';

export default function DebugPage() {
  return (
    <StandardPage>
      <DebugButtonColumn />
    </StandardPage>
  );
}