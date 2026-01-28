import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { tileConfig } from '../app/components/game/tileConfig'

describe('Tile.vue', () => {
  it('has correct mapping for value 2', () => {
    expect(tileConfig[2].bg).toBe('bg-amber-100')
  })

  it('can render a small template using tileConfig', () => {
    const Cmp = {
      props: { value: Number },
      template: '<div :class="tileClass">{{ value }}</div>',
      setup(props: any) {
        return {
          tileClass: tileConfig[props.value].bg
        }
      }
    }
    const wrapper = mount(Cmp as any, { props: { value: 2 } })
    expect(wrapper.classes()).toContain('bg-amber-100')
    expect(wrapper.text()).toBe('2')
  })
})
