class Animal {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    }

    speak() {
        return `${this.name} mondja: ${this.sound}`;
    }

    render() {
        const p = document.createElement('p');
        p.textContent = this.speak();
        document.getElementById('animal-container').appendChild(p);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'Vau vau!');
        this.breed = breed;
    }

    speak() {
        return `${super.speak()} (${this.breed})`;
    }
}

function createAnimals() {
    document.getElementById('animal-container').innerHTML = ''; // törlés
    const cat = new Animal('Cirmi', 'Miau');
    const dog = new Dog('Bodri', 'Puli');
    cat.render();
    dog.render();
}
