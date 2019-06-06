import { Vue, Watch, Component } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'
const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color

@Component
export default class ColorMixin extends Vue {
    @Getter('theme') private theme: any
    @Mutation('SET_THEME') private mTheme: any
    private themeVal: string = ORIGINAL_THEME
    protected created() {
        this.themeVal = this.theme
    }

    @Watch('themeVal')
    private onWatchThemeVal(val: any, oldVal: any) {
        this.mTheme(val)
        this.updateTheme(val, oldVal)
    }

    private updateTheme(val: any, oldVal: any) {
        if (typeof val !== 'string') {
            return
        }
        const head = document.getElementsByTagName('head')[0]
        const themeCluster = this.getThemeCluster(val.replace('#', ''))
        const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
        const getHandler = (variable: any, id: any) => {
            return () => {
                const originalCluster1: any = this.getThemeCluster(
                    ORIGINAL_THEME.replace('#', '')
                )
                const newStyle = this.updateStyle(
                    (this as any)[variable],
                    originalCluster1,
                    themeCluster
                )

                let styleTag = document.getElementById(id)
                if (!styleTag) {
                    styleTag = document.createElement('style')
                    styleTag.setAttribute('id', id)
                    head.appendChild(styleTag)
                }
                styleTag.innerText = newStyle
            }
        }

        const chalkHandler = getHandler('chalk', 'chalk-style')

        if (!(this as any).chalk) {
            const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
            this.getCSSString(url, chalkHandler, 'chalk')
        } else {
            chalkHandler()
        }

        const link = [].slice.call(
            document.getElementsByTagName('head')[0].getElementsByTagName('link')
        )
        for (let i = link.length - 3; i < link.length; i++) {
            const style: any = link[i]
            if (style.href.indexOf('app') !== -1) {
                this.getCSSString(style.href, (innerText: any) => {
                    const originalCluster1 = this.getThemeCluster(
                        ORIGINAL_THEME.replace('#', '')
                    )
                    const newStyle = this.updateStyle(
                        innerText,
                        originalCluster1,
                        themeCluster
                    )
                    let styleTag: any = document.getElementById(i + '')
                    if (!styleTag) {
                        styleTag = document.createElement('style')
                        styleTag.id = i
                        styleTag.innerText = newStyle
                        head.appendChild(styleTag)
                    }
                })
            }
        }

        const styles = [].slice
            .call(document.querySelectorAll('style'))
            .filter((style: any) => {
                const text = style.innerText
                return (
                    new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
                )
            })
        styles.forEach((style: any) => {
            const {
                innerText
            } = style
            if (typeof innerText !== 'string') { return }
            style.innerText = this.updateStyle(
                innerText,
                originalCluster,
                themeCluster
            )
        })
    }

    private updateStyle(style: any, oldCluster: any, newCluster: any) {
        let newStyle = style
        oldCluster.forEach((color: any, index: any) => {
            newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
        })
        return newStyle
    }

    private getCSSString(url: any, callback: any, variable?: any) {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (variable) {
                    (this as any)[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
                }
                callback(xhr.responseText)
            }
        }
        xhr.open('GET', url)
        xhr.send()
    }

    private getThemeCluster(theme: any) {
        const tintColor = (color: any, tint: any) => {
            let red: any = parseInt(color.slice(0, 2), 16)
            let green: any = parseInt(color.slice(2, 4), 16)
            let blue: any = parseInt(color.slice(4, 6), 16)

            if (tint === 0) {
                // when primary color is in its rgb space
                return [red, green, blue].join(',')
            } else {
                red += Math.round(tint * (255 - red))
                green += Math.round(tint * (255 - green))
                blue += Math.round(tint * (255 - blue))

                red = red.toString(16)
                green = green.toString(16)
                blue = blue.toString(16)

                return `#${red}${green}${blue}`
            }
        }

        const shadeColor = (color: any, shade: any) => {
            let red: any = parseInt(color.slice(0, 2), 16)
            let green: any = parseInt(color.slice(2, 4), 16)
            let blue: any = parseInt(color.slice(4, 6), 16)

            red = Math.round((1 - shade) * red)
            green = Math.round((1 - shade) * green)
            blue = Math.round((1 - shade) * blue)

            red = red.toString(16)
            green = green.toString(16)
            blue = blue.toString(16)

            return `#${red}${green}${blue}`
        }

        const clusters = [theme]
        for (let i = 0; i <= 9; i++) {
            clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
        }
        clusters.push(shadeColor(theme, 0.1))
        return clusters
    }
}
