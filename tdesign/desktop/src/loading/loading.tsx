import { h, tag, classNames, WeElement, OmiProps } from 'omi'
import { LoadingProps } from './type'
import { addClass, removeClass, canUseDocument, TdClassNamePrefix } from '../utils'
import './gradient'
import css from './style/index'

@tag('t-loading')
export default class Link extends WeElement<LoadingProps> {
  static css = css as string

  static defaultProps = {
    delay: 0,
    fullscreen: false,
    indicator: true,
    inheritColor: false,
    loading: true,
    preventScrollThrough: true,
    showOverlay: true,
    size: 'medium',
  }

  static propTypes = {
    attach: [Object, String],
    children: Object,
    content: Object,
    delay: Number,
    fullscreen: Boolean,
    indicator: Object,
    inheritColor: Boolean,
    loading: Boolean,
    preventScrollThrough: Boolean,
    showOverlay: Boolean,
    size: String,
    text: Object,
    zIndex: Number,
  }

  timer: ReturnType<typeof setTimeout>
  showLoading: Boolean = false
  componentName = TdClassNamePrefix('loading')
  lockClass = `${this.componentName}--lock`
  textClass = `${this.componentName}__text`
  centerClass = `${this.componentName}--center`
  inheritColorClass = `${this.componentName}--inherit-color`
  fullClass = `${this.componentName}--full`
  fullscreenClass = `${this.componentName}__fullscreen`
  overlayClass = `${this.componentName}__overlay`
  relativeClass = `${this.componentName}__parent`

  setTimer = () => {
    const { delay, loading } = this.props
    this.showLoading = delay ? false : loading
    if (delay && loading) {
      this.timer = setTimeout(() => {
        this.showLoading = loading
      }, delay)
    } else {
      this.showLoading = loading
    }
  }

  setBodyClass = () => {
    const { loading, preventScrollThrough, fullscreen } = this.props
    if (preventScrollThrough && fullscreen && canUseDocument && loading) {
      addClass(document.body, this.lockClass)
    }
  }

  install() {
    this.setTimer()
    this.setBodyClass()
  }

  uninstall() {
    clearTimeout(this.timer)
    removeClass(document.body, this.lockClass)
  }

  calcStyles = () => {
    const { zIndex, size } = this.props
    const styles = {}

    if (zIndex !== undefined) {
      Object.assign(styles, { zIndex: zIndex })
    }

    if (!['small', 'medium', 'large'].includes(size)) {
      Object.assign(styles, { fontSize: size })
    }

    return this.props.style ? { ...styles, ...this.props.style } : styles
  }

  commonContent = () => {
    const { indicator, text } = this.props
    let renderIndicator = <t-loading-gradient />

    if (indicator && typeof indicator !== 'boolean') {
      renderIndicator = indicator as JSX.Element
    }
    return (
      <>
        {indicator ? renderIndicator : null}
        {text ? <div className={this.textClass}>{text}</div> : null}
      </>
    )
  }

  render(props: OmiProps<LoadingProps>) {
    const {
      componentName,
      fullClass,
      centerClass,
      overlayClass,
      relativeClass,
      fullscreenClass,
      inheritColorClass,
      calcStyles,
      commonContent,
      showLoading,
    } = this
    const { fullscreen, content, children, loading, showOverlay } = props

    const loadingStyle = this.calcStyles()

    const baseClasses = classNames(
      centerClass,
      {
        [TdClassNamePrefix('size-s')]: props.size === 'small',
        [TdClassNamePrefix('size-l')]: props.size === 'large',
        [TdClassNamePrefix('size-m')]: props.size === 'medium',
      },
      {
        [inheritColorClass]: props.inheritColor,
      },
      props.class,
    )

    if (fullscreen) {
      return loading ? (
        <div class={classNames(componentName, fullscreenClass, centerClass, overlayClass)} style={calcStyles}>
          <div class={baseClasses}>{commonContent()}</div>
        </div>
      ) : null
    }

    if (content || children.length > 0) {
      return (
        <div class={relativeClass}>
          {content || children}
          {showLoading ? (
            <div
              class={classNames(componentName, baseClasses, fullClass, {
                [overlayClass]: showOverlay,
              })}
              style={calcStyles}
            >
              {commonContent()}
            </div>
          ) : null}
        </div>
      )
    }

    //TODO attach

    return loading ? (
      <div class={classNames(componentName, baseClasses)} style={calcStyles}>
        {commonContent()}
      </div>
    ) : null
  }
}
