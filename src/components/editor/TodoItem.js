import { Node } from 'tiptap'
import { splitToDefaultListItem, liftListItem } from 'tiptap-commands'
import TodoItemComponent from './TodoItemComponent'

export default class TodoItem extends Node {

  get name() {
    return 'todo_item'
  }

  get view() {
    return TodoItemComponent
  }

  get schema() {
    return {
      attrs: {
        done: {
          default: false,
        },
        endDate: {
          default: null
        }
      },
      draggable: true,
      content: 'paragraph',
      toDOM: node => {
        const { done, endDate } = node.attrs

        return [
          'li',
          {
            'data-type': this.name,
            'data-done': done.toString(),
            'data-end-date' : endDate
          },
          ['span', { class: 'todo-checkbox', contenteditable: 'false' }],
          ['div', { class: 'todo-content' }, 0],
        ]
      },
      parseDOM: [{
        priority: 51,
        tag: `[data-type="${this.name}"]`,
        getAttrs: dom => ({
          done: dom.getAttribute('data-done') === 'true',
          endDate: dom.getAttribute('data-end-date'),
        }),
      }],
    }
  }

  keys({ type }) {
    return {
      Enter: splitToDefaultListItem(type),
      'Shift-Tab': liftListItem(type),
    }
  }

}
