class BusinessTimer {
    interval: any;

    remainingTime: number;

    start(onTick: Function, ms: number, durationMs: number, onTime: Function, firstRemaining?: number) {
        this.remainingTime = firstRemaining || durationMs;

        this.interval = setInterval(() => {

            this.remainingTime = this.remainingTime - ms;
            if (this.remainingTime < 0) {
                this.stop();
                onTime();
                return;
            }

            onTick(this.remainingTime);
        }, ms);
    }

    stop() {
        clearInterval(this.interval);
    }
}

export default BusinessTimer;