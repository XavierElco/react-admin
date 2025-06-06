export default {
    set(key: string, value: unknown) {
        localStorage.setItem(key, JSON.stringify(value))
    },

    get(key: string) {
        const value = localStorage.getItem(key);

        if (!value) return ''
        try {
            return JSON.parse(value)

        } catch (err) {
            return value
        }
    },

    remove(key: string) {
        localStorage.removeItem(key)
    },

    clear() {
        localStorage.clear()
    }
}