import React from 'react'
import { IResult } from "../../../types"
import { Component, PureComponent } from 'react'
import { HightLight } from "../../high-light"
const styles = require("./style.css")
interface IItemProps {
  title: string,
  text: string,
  icon: string,
  shortcut?: string,
  index: number,
  onClick?: (idx: number) => void
}
class Item extends PureComponent<IItemProps, Object> {
  render() {
    const { index, title, text, icon, shortcut, onClick } = this.props
    return (
      <div className={styles.item} onClick={() => onClick && onClick(index)}>
        <div className={styles.icon}>
          <img src={icon} />
        </div>
        <div>
          <div> <HightLight>{title}</HightLight></div>
          <div><HightLight>{text}</HightLight></div>
        </div>
        {
          shortcut && <div className={styles.shortcut}>{shortcut}</div>
        }
      </div>
    )
  }
}

export interface IProps {
  data: IResult[],
  onClick: (index: number) => any,
  bindShortcut?: () => void,
  unBindShortcut?: () => void,
  shortcut: string
}
export class List extends Component<IProps, Object> {
  static defaultProps: IProps = {
    shortcut: 'alt',
    data: [],
    onClick: (index: number) => console.log(index)
  }
  render() {
    const { data, shortcut, onClick } = this.props
    return (<div className={styles.list}>
      {
        data.map((item, idx) => <Item
          key={idx}
          index={idx}
          title={item.title}
          text={item.text}
          icon={item.icon}
          onClick={onClick}
          shortcut={idx < 9 ? `${shortcut}+${idx + 1}` : undefined}
        />)
      }
    </div>)
  }
  componentDidMount() {
    this.props.bindShortcut && this.props.bindShortcut()
  }
  componentWillUnmount() {
    this.props.unBindShortcut && this.props.unBindShortcut()
  }
}