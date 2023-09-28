import { useState } from 'react';

// This is correctly flagged (verify rule is working in general)
(class { useFoo() { useState() } });

// These cases from the rules-of-hooks test aren't flagged with typescript-eslint v5
(class {useHook = () => { useState() }});
(class {h = () => { useState() }});

// Same issue with ClassDeclarations
class Foo {
  // correctly flagged
  useFoo() { useState() }

  // not flagged
  useBar = () => { useState() }
}

