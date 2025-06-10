# Introduction

This is a web API for a [Top Dog Show](https://adbadog.com/calendar/top-dog-events/), but applying the rules
used in Brazil.

# Basic Rules

The Top Dog event is an athletic competition for dogs from the American Pitbull Terrier breed (but other breeds can participate in their own categories).

There are four so called "disciplines", which are tasks that the dog should perform and points are given to it in accordance with its performance.

## Disciplines

The disciplines definitions are given in the following.

### Wall Climb

The dog should climb a vertical wall and fetch its toy. The following steps are involved:

1. Dog handler defines the a height for the toy;
2. Dog climbs the wall and tries to fetch the toy. The dog has three attempts for each height.
   If it fetches the toy within this number of attempts, the handler can set a higher height for new attempts, going to step 1 again.
3. If the dog fails three attempts, the discipline is over.

Every mark of a succesful fetch is registered along with the amount of attempts needed and the total performance time.

Wins the dog which reaches the heighest mark in less attempts or in the shorter period of time.

### High Jump

The dog should jump from the ground and fetch its toy. The rules are just the same as for the wall climb.

### Long Jump

The dog should launch itself from a bench as far as possible horizontally.
It has five attempts, in each one the distance is registered.

Wins the dog who reaches the longest horizontal distance.

### Treadmill

The dog should run on a mechanical treadmill in a given period of time and the distance is registered.

Wins the dog which runs the longest distance.

## Categories

The Pit Bulls are split in three categories, in accordance to their weights:

1. Light - up to 19.999kg
2. Medium - from 20 up to 24.999kg
3. Heavy - from 25kg

Other breeds compete in their own categories.

## Ranking

The top five dogs with the best results are given points for each discipline. The ranking is defined based on those points, and there are three of them:

1. General
2. By category
3. By discipline

# API Architecture

This API tries to follow the [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) principles.

The architecture diagrams can be viewed [here](./documentation/design/architecture.md).
