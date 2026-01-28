import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

describe('smoke', () => {
  it('mounts simple component with prop', () => {
    const Cmp = defineComponent({ props: { value: Number }, template: '<div>{{ value }}</div>' })
    const w = mount(Cmp as any, { props: { value: 2 } })
    expect(w.text()).toBe('2')
  })
})
