---
title: "Are Dart and Java type systems sound?"
date: 2020-11-08T19:38:58+01:00
draft: false
tags: [programming, computerscience, java, dart, type-system]
---

From Dart docs:

> **Soundness** is about ensuring your program can’t get into certain invalid states. A **sound type system** means you can never get into a state where an expression evaluates to a value that doesn’t match the expression’s static type. For example, if an expression’s static type is `String`, at runtime you are guaranteed to only get a string when you evaluate it.
>
> Dart’s type system, like the type systems in Java and C#, is sound. It enforces that soundness using a combination of static checking (compile-time errors) and runtime checks. For example, assigning a `String` to `int` is a compile-time error. Casting an `Object` to a string using `as String` fails with a runtime error if the object isn’t a string.

This is an interesting point of view - yes type system is sound (based on the provided definition), but at the same time it means that the application can crash due to type error 🤔.

For example, if I would write:

```java
public class HelloWorld{
    public static void main(String []args){
        String[] strs = { 1 };
    }
}
```

It will not compile:

```
$javac HelloWorld.java
HelloWorld.java:4: error: incompatible types: int cannot be converted to String
        String[] strs = { 1 };
                          ^
1 error
```

But this will compile:

```java
public class HelloWorld{
    public static void main(String []args){
        String[] strs = { "1" };
        Object[] objs = strs;
        objs[0] = 1;
        String one = strs[0];
        System.out.println("Hello World");
    }
}
```

and fail:

```
$javac HelloWorld.java
$java -Xmx128M -Xms16M HelloWorld
Exception in thread "main" java.lang.ArrayStoreException: java.lang.Integer
	at HelloWorld.main(HelloWorld.java:6)

```

I feel like something is twisted here.

**Can we say that type system is sound, but static analyzer isn't?**

Or the other way around - if we can say that relying on dynamic type checks is enough to have a sound type system, can we say that Ruby is sound?

```ruby
1 + "0"
// TypeError: String can't be coerce into Numeric
```

See also: [Java is Unsound: The Industry Perspective](https://dev.to/rosstate/java-is-unsound-the-industry-perspective)
