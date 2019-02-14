import "../asserts/styles/footer.styl"

export default {
    data() {
        return {
            name: "张三"
        }
    },
    render() {
        return (
            <div id="footer">
                <span>write by {this.name}</span>
            </div>
        )
    }
}