export default interface Microphone {
    get: () => number,
    set: (value: number) => void,
}