import Vue from 'vue'
import AddMovie from '@/components/AddMovie'

describe('AddMovie', () => {
  let cmp, vm;
  beforeEach(() => {
    cmp = Vue.extend(AddMovie)
    vm = new cmp({
      data: {
        year: ['2018', '2017', '2016', '2015']
      }
    }).$mount()
  })

  it('equals years to ["2018", "2017", "2016", "2015"]', () => {
    expect(vm.year).toEqual(['2018', '2017', '2016', '2015'])
  })

  it('has a submit() method', () => {
    expect(typeof vm.submit).toEqual('function')
  })

  it('has a clear() method', () => {
    expect(typeof vm.clear).toEqual('function')
  })
})