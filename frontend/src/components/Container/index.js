function Container({ children }) {
    return (
        <main className="container" style={{ height: '85vh' }}>
            {children}
        </main>
    )
}

export default Container