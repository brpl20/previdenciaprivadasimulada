// src/app/GoogleScripts.tsx
"use client";

import { useState, useEffect } from "react";
import type {GoogleAnalytics as GAComponent, GoogleTagManager as GTMComponent} from '@next/third-parties/google'
import { ScriptProps } from "next/script";

interface GComponents {
    TagManager: typeof GTMComponent
    Analytics: typeof GAComponent
}
interface GoogleScriptsProps extends Pick<ScriptProps, 'nonce'> {
  visited?: '1',
}

/**
 * @todo: Instalar um cookie que pula o sleep, pra que funcione
 * apenas pra medir o SEO
 */

export const GoogleScripts = ({nonce, visited}: GoogleScriptsProps) => {
  const [Google, setGoogle] = useState<GComponents>();
  const [interacted, _setInteracted] = useState(false)

  const setInteracted = () => !Google ? _setInteracted(true): undefined

  useEffect(() => {
    if (visited) return
    const evtSettings: AddEventListenerOptions = { once: true, passive: true }

    addEventListener('mousemove', setInteracted, evtSettings);
    addEventListener('keydown', setInteracted, evtSettings);
    addEventListener('pointerdown', setInteracted, evtSettings);
    return () => {
      removeEventListener('mousemove', setInteracted, evtSettings);
      removeEventListener('keydown', setInteracted, evtSettings);
      removeEventListener('pointerdown', setInteracted, evtSettings);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const useEffectFlags = [Google, interacted, visited]
  useEffect(() => {
    if (Google) return

    (async () => {

      if (!visited && !interacted) {
        await new Promise(r => setTimeout(r, 4800))
        if (window?.innerWidth >= 900) {
          await new Promise(r => setTimeout(r, 2600))
        }
        // Quando alguma dessas flags setar, useEffect dispara novamente
        if (useEffectFlags.some(f => f)) return
      }

      const {
        GoogleTagManager: TagManager,
        GoogleAnalytics: Analytics
    } = await import("@next/third-parties/google");
      setGoogle({TagManager, Analytics})
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, useEffectFlags);

  return (Google? <>
        <Google.TagManager gtmId="GTM-PH5ZGZMP" dataLayer={undefined} nonce={nonce} />
        <Google.Analytics gaId="G-4WNG4M5FGF" nonce={nonce} />
      </>: null
  );
};