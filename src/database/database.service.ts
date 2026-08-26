import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'; // interfaces Nest checks for at startup/shutdown

@Injectable() // makes this class injectable/injected via DI, same as any other provider
export class DatabaseService implements OnModuleInit, OnApplicationShutdown { // implementing both is what makes Nest call the hooks below
    private isconnected: boolean = false; // tracks connection state; false until connect() runs

    //life cyscle hook called by Nest after DI has resolved this service's dependencies, but before any request can be handled
    onModuleInit() { // Nest calls this ONCE, automatically, right after DI has resolved this service's own dependencies
        console.log('DatabaseService initialized'); // proves the hook actually fired, before any request is possible
        this.connect(); // safe to call now — by onModuleInit time, this class is fully constructed
    }

    connect(): string { // plain method — not a lifecycle hook itself, just called BY one
        this.isconnected = true; // flips the flag; in a real app this would be an actual DB client connect() call
        console.log('DatabaseService connect() called'); // proves the method actually ran, after onModuleInit fired 
        return 'Database connected'; // return value here is unused by Nest — onModuleInit ignores it
    
    }


    // signal is optional, but Nest passes it in when the app is shutting down (e.g. Ctrl+C)
    onApplicationShutdown(signal?: string) { // Nest calls this ONCE, automatically, as the final step before the process exits
        this.isconnected = false; // flips the flag; in a real app this would be an actual DB client disconnect() call
        console.log(`DatabaseService shutting down due to signal: ${signal}`);
    }

    // lifecycle hooks starts with on keyword on, and are called by Nest automatically at the right time. They are not called by your code, and you don't call them yourself. They are just methods that Nest looks for and calls at the right time.
}
