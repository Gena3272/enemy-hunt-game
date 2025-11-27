declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.sass' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.mp3' {
    const src: string;
    export default src;
}

declare module '*.wav' {
    const src: string;
    export default src;
}

declare module '*.ogg' {
    const src: string;
    export default src;
}
