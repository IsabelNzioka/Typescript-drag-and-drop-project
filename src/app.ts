// Autobind decorator
function autobind(_: any, _1: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value; //access the original method
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this); //this will referbto whatever is reponsible for triggering the getter method.
      return boundFn;
      // will not be overwritten by the addEventListener
    },
  };
  return adjDescriptor;
}

// ProjectInput Class
class ProjectTemplate {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement; //where we're going to render our element tp
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // ACCESS THE HTML ELEMENTS
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    // ! as HTMLTemplateElement - assure TS that the element is going to be available and that it will be of Type HTMLTemplateElement
    // TYPE CASTING
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // RENDER THE ELEMENTS
    // import the content of the templateElement(form) and render it to the dom

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    // Get access to the different form inputs
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach(); //call the private method so that its code also executes
  }

  // Add a listener to our form
  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const firstProject = new ProjectTemplate();
