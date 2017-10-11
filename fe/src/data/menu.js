import Catalog from '../router/catalog'

export default getMenu()

function getMenu() {
    const menu = [{
        name: "Home",
        icon: "fa-home",
        route: "Home",
    }]

    console.log(Catalog)

    Object.keys(Catalog).forEach(k => {
        const level1 = Catalog[k]
        const item = {
            name: level1.name || k,
            route: k,
            icon: level1.self && level1.self.icon ? level1.self.icon : "fa-question",
            sub: []
        }
        Object.keys(level1).forEach(p => {
            const level2 = level1[p]
            if (p == "self" || level2.invisiable || !level2.component) {
                return
            }
            const sub = {
                name: level2.name || k + '-' + p,
                route: k + '-' + p,
                icon: level2.icon || "fa-question",
            }

            item.sub.push(sub)
        })
        menu.push(item)
    })

    return menu
}
