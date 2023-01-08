import { useTodoListStore } from "@/stores/todos";
import { setActivePinia, createPinia } from "pinia";
import { TodoFilterEnum } from "shared";

describe("store", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });
  it("should have default state", () => {
    const store = useTodoListStore();
    expect(store.list.length).to.equal(0);
  });
  it("should add todo ", () => {
    const store = useTodoListStore();
    expect(store.list.length).to.equal(0);
    store.addTodo("in pinia");
    expect(store.list.length).to.equal(1);
    expect(store.list[0].isDone).to.equal(false);
    expect(store.list[0].label).to.equal("in pinia");

    store.addTodo("dont't need vue");
    expect(store.list.length).to.equal(2);
  });

  it("should delete todo", () => {
    const store = useTodoListStore();
    expect(store.list.length).to.equal(0);
    store.addTodo("in pinia");
    store.deleteTodo(store.list[0]);
    expect(store.list.length).to.equal(0);
  });

  it("should toggle status", () => {
    const store = useTodoListStore();
    store.addTodo("in pinia");
    expect(store.list[0].isDone).to.equal(false);
    store.toggleTodo(store.list[0], true);
    expect(store.list[0].isDone).to.equal(true);
    store.toggleTodo(store.list[0], false);
    expect(store.list[0].isDone).to.equal(false);
  });
  it("should filter displayList", () => {
    const store = useTodoListStore();
    store.addTodo("todo 1");
    store.addTodo("done 1");
    store.toggleTodo(store.list[1], true);
    store.addTodo("todo 2");

    store.setFilter(TodoFilterEnum.All);
    expect(store.displayList.length).to.equal(3);
    store.setFilter(TodoFilterEnum.Active);
    expect(store.displayList.length).to.equal(2);
    expect(store.displayList.map((item) => item.label)).not.include("done 1");

    store.setFilter(TodoFilterEnum.Done);
    expect(store.displayList.length).to.equal(1);
    expect(store.displayList.map((item) => item.label)).to.include("done 1");
  });
});

export {};
