import Catalog from '../router/catalog'

export const menuData = getData()
export const menuMap = getMap()

function getData() {
    const menu = [{
        name: "Home",
        icon: "fa-home",
        route: "Home",
    }]

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
                name: level2.name || p,
                route: k + '-' + p,
                icon: level2.icon || "fa-question",
            }

            item.sub.push(sub)
        })
        menu.push(item)
    })

    return menu
}

function getMap() {
    const map = {
        'home': 'home'
    }

    Object.keys(Catalog).forEach(k => {
        const level1 = Catalog[k]
        map[k] = k
        Object.keys(level1).forEach(p => {
            const level2 = level1[p]
            if (p == "self" || !level2.component) {
                return
            }
            let key = k + '-' + p
            if (level2.activeAs) {
                map[key] = k + '-' + level2.activeAs
            } else {
                map[key] = key
            }
        })
    })

    return map
}
