
package JavaPPP;

import java.util.ArrayList;
import java.util.List;

public class Test { 
  public static void main(String args[]) {
    Dog d = new Dog("火腿肠"); d.eat(); // 继承自Animal类 
    d.bark(); // 继承自Dog类

    Publisher publisher = new Publisher();
    Subscriber subscriber1 = new Subscriber();
    Subscriber subscriber2 = new Subscriber();
    publisher.addSubscriber(subscriber1);
    publisher.addSubscriber(subscriber2);
    publisher.notifySubscribers("Hello, World!");

    publisher.removeSubscriber(subscriber1);
    publisher.notifySubscribers("Hello, World! 2 ");

   }
}
class Animal {
   String food; 
   public Animal(String food){ this.food = food; } 
   public void eat() { System.out.println("狗吃了" + this.food); 
  }
}
   
class Dog extends Animal { 
  public Dog(String food){ super(food); } 
  public void bark() { System.out.println("Dog is barking");}
}


// 要不你写个发布订阅，用 java
class Publisher {
  private List<Subscriber> subscribers = new ArrayList<>();
  public void addSubscriber(Subscriber subscriber) {
    subscribers.add(subscriber);
  }

  public void removeSubscriber(Subscriber subscriber) {
    subscribers.remove(subscriber);
  }
  public void notifySubscribers(String message) {
    for (Subscriber subscriber : subscribers) {
      subscriber.receive(message);
    }
  }
}

class Subscriber {
  public void receive(String message) {
    System.out.println(message);
  }
}
