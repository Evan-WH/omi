import { h, tag, WeElement, OmiProps, createRef, classNames } from 'omi'
import { TdDropdownProps, TdDropdownItemProps, DropdownOption } from './type'
import css from './style/index'
import './dropdownItem'
import { TdClassNamePrefix } from '../utils'
import { throttle } from 'lodash'
import '../icon/chevron-right'
import '../icon/chevron-left'
import '../divider'

type DropDownMenuProps = {
  options: TdDropdownProps['options']
  maxHeight: TdDropdownProps['maxHeight']
  minColumnWidth: TdDropdownProps['minColumnWidth']
  maxColumnWidth: TdDropdownProps['maxColumnWidth']
  direction: TdDropdownProps['direction']
  onClick: TdDropdownItemProps['onClick']
}
@tag('t-dropdown-menu')
export default class DropdownMenu extends WeElement<DropDownMenuProps> {
  static css = css as string

  menuRef = createRef()
  calcScrollTopMap: { [key: number]: any } = {}
  isOverMaxHeight = false
  dropdownClass = TdClassNamePrefix('dropdown')
  dropdownItemClass = TdClassNamePrefix('dropdown__item')
  dropdownMenuClass = TdClassNamePrefix('dropdown__menu')

  static defaultProps = {
    options: [] as TdDropdownProps['options'],
    maxHeight: 300,
    minColumnWidth: 10,
    maxColumnWidth: 160,
  }

  static propTypes = {
    direction: String,
    maxHeight: Number,
    maxColumnWidth: [String, Number],
    minColumnWidth: [String, Number],
    options: Array,
    onClick: Function,
  }
  handleScroll = (e: MouseEvent, deep = 0) => {
    const { scrollTop } = e.target as HTMLElement
    this.calcScrollTopMap = { ...this.calcScrollTopMap, [deep]: scrollTop }
    this.update()
  }

  handleItemClick = (options: { data: DropdownOption; context: { e: MouseEvent } }) => {
    const { data, context } = options
    data?.onClick?.(data, context)
    this.props.onClick?.(data, context)
  }

  throttleUpdate = throttle(this.handleScroll, 100)
  renderOptions = (data: Array<DropdownOption | WeElement>, deep: number) => {
    const arr: any[] = []
    let renderContent: any
    data.forEach?.((menu, idx) => {
      const optionItem = { ...(menu as DropdownOption) }
      const onViewIdx = Math.ceil(this.calcScrollTopMap[deep] / 30)
      const itemIdx = idx >= onViewIdx ? idx - onViewIdx : idx
      if (optionItem.children) {
        optionItem.children = this.renderOptions(optionItem.children, deep + 1)
        renderContent = (
          <div key={idx}>
            <t-dropdown-item
              class={classNames(optionItem.class, `${this.dropdownItemClass}--suffix`)}
              {...optionItem}
              minColumnsWidth={this.props.minColumnWidth}
              maxColumnsWidth={this.props.maxColumnWidth}
              isSubmenu={true}
            >
              <div class={`${this.dropdownItemClass}-context`}>
                {this.props.direction === 'right' ? (
                  <>
                    <span class={`${this.dropdownItemClass}-text`}>{optionItem.content}</span>
                    <t-icon-chevron-right
                      class={`${this.dropdownItemClass}-direction`}
                      size="16"
                    ></t-icon-chevron-right>
                  </>
                ) : (
                  <>
                    <t-icon-chevron-left class={`${this.dropdownItemClass}-direction`} size="16"></t-icon-chevron-left>
                    <span class={`${this.dropdownItemClass}-text`}>{optionItem.content}</span>
                  </>
                )}
              </div>
              <div
                className={classNames(`${this.dropdownClass}__submenu-wrapper`, {
                  [`${this.dropdownClass}__submenu-wrapper--${this.props.direction}`]: this.props.direction,
                })}
                style={{
                  position: 'absolute',
                  top: `${itemIdx * 30}px`,
                }}
              >
                <div
                  class={classNames(`${this.dropdownClass}__submenu`, {
                    [`${this.dropdownClass}__submenu--disabled`]: optionItem.disabled,
                  })}
                  style={{
                    position: 'static',
                    maxHeight: `${this.props.maxHeight}px`,
                  }}
                  onScroll={(e: MouseEvent) => this.handleScroll(e, deep + 1)}
                >
                  <ul>{optionItem.children}</ul>
                </div>
              </div>
            </t-dropdown-item>
            {optionItem.divider ? <t-divider /> : null}
          </div>
        )
      } else {
        renderContent = (
          <div key={idx}>
            <t-dropdown-item
              class={classNames(optionItem.class, this.dropdownItemClass)}
              {...optionItem}
              minColumnsWidth={this.props.minColumnWidth}
              maxColumnsWidth={this.props.maxColumnWidth}
              onClick={
                optionItem.disabled || optionItem.children
                  ? (): void => null
                  : (value: TdDropdownItemProps['value'], context: { e: MouseEvent }) =>
                      this.handleItemClick({ data: optionItem, context })
              }
            >
              <span class={`${this.dropdownItemClass}-text`}>{optionItem.content}</span>
            </t-dropdown-item>
            {optionItem.divider ? <t-divider /> : null}
          </div>
        )
      }
      arr.push(renderContent)
    })
    return arr
  }

  updateOverMaxHeight = () => {
    if (this.menuRef.current) {
      const menuElement = this.menuRef.current as HTMLElement
      const menuHeight = menuElement.childNodes?.length * 30
      if (menuHeight > this.props.maxHeight) {
        this.isOverMaxHeight = true
      }
    }
  }
  beforeUpdate() {
    this.updateOverMaxHeight()
  }

  render(props: OmiProps<DropDownMenuProps>) {
    return (
      <div
        className={classNames(this.dropdownMenuClass, `${this.dropdownMenuClass}--${props.direction}`, {
          [`${this.dropdownMenuClass}--overflow`]: this.isOverMaxHeight,
        })}
        style={{
          maxHeight: `${props.maxHeight}px`,
        }}
        ref={this.menuRef}
        onScroll={this.throttleUpdate}
      >
        {this.renderOptions(props.options, 0)}
      </div>
    )
  }
}