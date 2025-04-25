<prompt1>
# Game Programmer and Animator Instructions: "Cosmic Carrot Collector"
Core Technical Requirements
Planet System

Implement a 2D circular planet system with 4 planets total (home planet + 3 additional planets)
Each planet should have its own gravitational pull that affects the player
Gravity should orient the player to stand perpendicular to the planet surface
Planets should be visually distinct but maintain consistent pixel art style
Implement collision detection for player-planet interaction

Player Movement & Physics

Create player character with ability to walk around planet perimeters (left/right arrow keys)
Implement jumping mechanics (space bar) with appropriate physics
Develop inter-planetary travel system:

Player can jump with sufficient velocity to escape planet's gravity
Player gets pulled toward nearest planet when within gravity range
Ensure smooth transitions between gravitational fields



Collectibles & Scoring

Implement carrot collectibles scattered across all planets
Create collision detection for player-carrot interaction
Display real-time score counter showing collected carrots (0/5)
Track and update score when carrots are collected

Game Flow

Game starts immediately when loaded (no start screen)
Implement game end condition when 5 carrots are collected
Create "Congratz" popup modal when game ends
Add option to restart game after completion

Graphics & Animation

Design simple pixel art (or ASCII art if preferred) for:

Player character with walking and jumping animations
4 distinct planets with different appearances
Carrot collectibles with pickup animation
Background space environment


Keep visuals minimalist but charming

Mobile & Responsive Implementation

Ensure responsive canvas that adjusts to different screen sizes
Implement touch controls for mobile:

On-screen directional buttons for movement
Jump button for jumping/planet transitions


Test on multiple device resolutions to ensure playability

UI Elements

Score display in top corner showing "Carrots: X/5"
Control instructions displayed at start
"Congratz" popup with replay option
Ensure UI scales appropriately for different screen sizes

Technical Implementation Notes

Use HTML5 Canvas for rendering
Implement game loop with requestAnimationFrame()
Utilize simple physics calculations for gravity and movement
Optimize for mobile performance (limit particles/effects)
Structure code modularly for easy iteration

Development Milestones

Single planet with player movement and gravity
Multiple planets with gravity transitions
Collectible carrots and scoring system
Game completion condition and congratulatory popup
Mobile responsiveness and touch controls
Graphics and animation polish
</prompt1>


<prompt2>
# Story Writer and Producer Instructions: "Cosmic Carrot Collector"
Game Concept & Narrative Direction
Setting & World-Building

Create a whimsical space setting featuring 4 unique circular planets
Develop a simple backstory explaining why carrots are scattered across these planets
Give each planet a distinct personality through visual characteristics and subtle environmental storytelling
Consider how gravity variations might influence the "feel" of each planet (heavy, light, erratic)

Character Development

Design a simple but charming protagonist with clear motivation for collecting carrots
Consider: Is the character a space rabbit? A hungry astronaut? A botanical researcher?
Create a brief character profile that informs animation style and game feel

Narrative Structure

Develop a minimalist narrative that can be conveyed without dialogue or text beyond UI elements
The narrative should support the core gameplay loop: why is the character planet-hopping to collect carrots?
Consider potential environmental storytelling through planet designs and carrot placements

Thematic Elements

Identify 2-3 core themes that inform the game's aesthetic (examples: exploration, harvest, bounty)
Ensure visual elements support these themes
Consider how game mechanics (jumping between planets, collecting) reinforce narrative themes

Production Guidelines
Project Scope Management

Break down development into 6 discrete milestones (see Technical Implementation Notes)
Schedule 3 review points for team alignment on vision and execution
Identify potential scope creep risks and establish containment strategies
Document clear acceptance criteria for each feature

Asset Production Planning

Create asset list prioritized by development needs:

Player character sprites (idle, walk, jump)
Planet designs (4 variations)
Carrot collectibles
Background elements
UI components


Establish visual style guide for consistent pixel art/ASCII art approach
Define animation requirements for core game elements

Team Coordination

Schedule regular check-ins between programming and art teams
Establish collaborative workflow for iterative development
Create shared documentation for game mechanics, narrative elements, and visual style
Facilitate communication between technical and creative team members

Playtesting & Refinement

Plan for at least 2 rounds of playtesting:

Core mechanics validation
Full game experience assessment


Create feedback collection templates focusing on:

Clarity of objectives
Satisfaction of planet-hopping mechanic
Overall game feel and narrative comprehension



Project Timeline

Pre-production: Concept finalization, asset planning, narrative outline (Week 1)
Production Phase 1: Core mechanics and basic visuals (Weeks 2-3)
Production Phase 2: Complete game implementation (Weeks 4-5)
Polish & Refinement: Based on playtesting feedback (Week 6)

Creative Considerations
Narrative Questions to Resolve

Why are carrots valuable/important in this universe?
What distinguishes each planet beyond visual appearance?
What happens after all carrots are collected (beyond "Congratz")?
Is there an implied larger universe beyond these 4 planets?

Potential Narrative Hooks

The carrots are cosmic seeds that could grow into new planets
The player is gathering food for their home planet
The carrots are fragments of an ancient space treasure
The carrots contain special energy needed for interplanetary travel

Remember to document all narrative decisions to inform the visual design and animation priorities for the development team.
</prompt2>