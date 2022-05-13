
import { useEffect, useState } from 'react';

import Chip from '@mui/material/Chip';

export function Badge({ label, color = 'info', icon = null }) {
    const [text, setText] = useState(label);
    const [copyTextPresent, setCopyTextPresent] = useState(false);

    const copyLabel = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(label);

        setCopyTextPresent(true);
    };

    useEffect(() => {
        setText(label);
    }, [label])

    useEffect(() => {
        if (copyTextPresent) {
            setText('Copied!');
            const timer = setTimeout(() => {
                setCopyTextPresent(false);
            }, 1000);
            return () => {
                clearTimeout(timer);
                setText(label);
            };
        } else {
            setText(label);
        }
    }, [copyTextPresent]);

    return (
        <Chip color={color} icon={icon} label={text} onClick={copyLabel} />
    )
}