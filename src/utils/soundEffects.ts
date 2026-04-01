export const playSuccessSound = () => {
    if (typeof window === "undefined") return;

    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();

        // โน้ตเพลงความสำเร็จ (C6, E6, G6)
        const playNote = (freq: number, startTime: number, duration: number) => {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

            gainNode.gain.setValueAtTime(0, ctx.currentTime + startTime);
            gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + startTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            osc.start(ctx.currentTime + startTime);
            osc.stop(ctx.currentTime + startTime + duration);
        };

        playNote(1046.50, 0, 0.4); // C6
        playNote(1318.51, 0.1, 0.4); // E6
        playNote(1567.98, 0.2, 0.8); // G6 (ยาวขึ้นนิดหน่อย)
    } catch (e) {
        console.error("Audio API not supported", e);
    }
};

export const playErrorSound = () => {
    if (typeof window === "undefined") return;

    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = "triangle";
        // เสียงทุ้มๆ เตือนว่าไม่ได้ (F2 -> E2)
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.2);

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
        console.error("Audio API not supported", e);
    }
};

export const playPopSound = () => {
    if (typeof window === "undefined") return;

    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
        console.error("Audio API not supported", e);
    }
};
