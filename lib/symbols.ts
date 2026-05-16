export interface PIDSymbol {
  id: string
  name: string
  category: string
  connectionType: string
  imageUrl: string
  keywords: string[]
  visualFeatures?: string // Visual description for AI recognition
}

// Visual feature descriptions for common P&ID symbols
export const symbolVisualFeatures: Record<string, string> = {
  // Valves - Basic shapes
  "ball_valve": "Two triangles pointing at each other (bowtie shape), vertices meeting at center",
  "gate_valve": "Two triangles with flat line between them, like gate closing",
  "globe_valve": "Two triangles with circle in the middle between vertices",
  "check_valve": "Single triangle with small circle or ball inside, flow direction indicated",
  "butterfly_valve": "Two triangles with vertical line through center (like butterfly wings)",
  "diaphragm_valve": "Arc or dome shape above valve body triangles",
  "needle_valve": "Narrow triangular shape, pointed like needle",
  "plug_valve": "Rectangle or trapezoid inside valve body",
  "relief_valve": "Triangle with arrow pointing outward (pressure release direction)",
  "control_valve": "Valve symbol with actuator on top (circle or rectangle)",
  "three_way_valve": "Three ports, T-shaped or Y-shaped valve body",
  "y_type_valve": "Y-shaped body with angled branch",
  
  // Fittings
  "elbow_90": "90-degree bend, L-shaped corner",
  "elbow_45": "45-degree bend, angled corner",
  "tee_equal": "T-shaped junction, all branches same size",
  "tee_reducing": "T-shaped with smaller branch (indicated by lines)",
  "reducer_concentric": "Tapered shape, centerlines aligned, cone-like",
  "reducer_eccentric": "Tapered shape, one side flat, off-center",
  "cap": "End termination, filled or closed end symbol",
  "blind_flange": "Vertical line with horizontal bars at flange face",
  "union": "Two arrows or lines pointing at each other with gap",
  "coupling": "Two short parallel lines connecting pipes",
  "cross": "Four-way junction, plus sign (+) shape",
  
  // Connection types (end symbols)
  "flanged": "Two parallel vertical lines at connection point",
  "socket_weld": "Small square or rectangle at connection",
  "butt_weld": "Small filled circle or dot at connection point",
  "threaded": "Thick black line or bar at connection",
  
  // Strainers
  "y_strainer": "Y-shaped with hatched or screened section in branch",
  "conical_strainer": "Cone/funnel shape with cross-hatching inside",
  
  // Special symbols
  "spectacle_blind": "Figure-8 shape (two circles connected)",
  "spade": "Solid circle or disk shape",
  "spacer": "Rectangle with dashed outline between flanges",
  "orifice": "Circle with 'O' or 'RO' label, or restriction plate symbol",
  
  // Isometric symbols
  "direction_arrow": "Arrow with N/S/E/W label indicating orientation",
  "slope_up": "Arrow pointing upward with slope indication",
  "slope_down": "Arrow pointing downward with slope indication",
  "weld_symbol": "Flag or triangle symbol on pipe line",
  "field_weld": "Filled black flag symbol",
  
  // Supports
  "support_shoe": "U-shape or saddle underneath pipe",
  "support_hanger": "Vertical line with hook from above",
  "support_guide": "Box with arrows showing movement direction",
  "support_anchor": "Filled box or X symbol indicating fixed point",
}

export const pidSymbols: PIDSymbol[] = [
  {
    id: "cap_socket_weld",
    name: "Cap (Socket Weld)",
    category: "Fittings",
    connectionType: "Socket Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cap_socket%20weld%20-j1xhIeZWxvod6wJ94rxa8xr7nwEn7p.png",
    keywords: ["cap", "socket", "weld", "fitting", "end"]
  },
  {
    id: "butt_weld",
    name: "Butt Weld",
    category: "Connections",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/butt%20weld%20-lihBB7GNophAmQwMoOxUG5mZrhsI6K.png",
    keywords: ["butt", "weld", "connection", "joint"]
  },
  {
    id: "bottom_valve_threaded",
    name: "Bottom Valve (Threaded)",
    category: "Valves",
    connectionType: "Threaded",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bottom%20valve_threade-2DskXNU8NVd2HtNFB5tzBoVegTQPcI.png",
    keywords: ["bottom", "valve", "threaded", "drain"]
  },
  {
    id: "diaphragm_valve_socket",
    name: "Diaphragm Valve (Socket)",
    category: "Valves",
    connectionType: "Socket Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diaphragm%20valve_socket%20-2oDnFbrygtUiphMLwpMOwD5rrKVGGh.png",
    keywords: ["diaphragm", "valve", "socket", "control"]
  },
  {
    id: "cap_butt_weld",
    name: "Cap (Butt Weld)",
    category: "Fittings",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cap_butt%20weld%20-LH1nqmGcJ4NKXS3CM1Q8YciLBmsEnW.png",
    keywords: ["cap", "butt", "weld", "fitting", "end"]
  },
  {
    id: "butterfly_valve_flange",
    name: "Butterfly Valve (Flange)",
    category: "Valves",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/butterfly%20valve_flange-jR3kaqvZJkMRMh178yWyR4wu4bTZkw.png",
    keywords: ["butterfly", "valve", "flange", "control"]
  },
  {
    id: "ball_valve_socket",
    name: "Ball Valve (Socket)",
    category: "Valves",
    connectionType: "Socket Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ball%20valve_socket%20-Zg5sZbz9XIZCk3js6oYPD67fsuC9bA.png",
    keywords: ["ball", "valve", "socket", "isolation"]
  },
  {
    id: "conical_strainer",
    name: "Conical Strainer",
    category: "Strainers",
    connectionType: "Inline",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/conical%20strainer%20-POzInUT1upeBivgo23z1kfIhTrA62V.png",
    keywords: ["conical", "strainer", "filter", "temporary"]
  },
  {
    id: "conical_strainer_built_in",
    name: "Conical Strainer (Built-in)",
    category: "Strainers",
    connectionType: "Built-in",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/conical%20strainer%20built%20in%20-bBEnzFOuKR5vgnuH1YYkAAbHJK6zOF.png",
    keywords: ["conical", "strainer", "built-in", "filter", "permanent"]
  },
  {
    id: "blind_flanges",
    name: "Blind Flange",
    category: "Fittings",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blind_flanges%20-5Xy2tJfyWr4WQml3HXKrwwTX3QJGhc.png",
    keywords: ["blind", "flange", "end", "cap"]
  },
  {
    id: "elbow_45_socket_weld",
    name: "Elbow 45° (Socket Weld)",
    category: "Fittings",
    connectionType: "Socket Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/elbow%2045_%20socket%20weld%20-HDf3cZ5UA8QVyeFUcjJN7GojHPs3AX.png",
    keywords: ["elbow", "45", "degree", "socket", "weld", "bend"]
  },
  {
    id: "diaphragm_valve_flanges",
    name: "Diaphragm Valve (Flanged)",
    category: "Valves",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diaphragm%20valve_flanges-S0CBusxASAuNQ8CnXWuZrN7CkZDQZf.png",
    keywords: ["diaphragm", "valve", "flange", "control"]
  },
  {
    id: "ball_valve_butt_weld",
    name: "Ball Valve (Butt Weld)",
    category: "Valves",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ball%20valve_butt%20weld%20-0laVMIZPcsvxnWW9lzQkjTK7u8j00I.png",
    keywords: ["ball", "valve", "butt", "weld", "isolation"]
  },
  {
    id: "check_valve_butt_weld",
    name: "Check Valve (Butt Weld)",
    category: "Valves",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/check%20valve_butt%20weld%20-o0iVnQOyVv9Fo5pzhTUKmgFxwDhQWC.png",
    keywords: ["check", "valve", "butt", "weld", "non-return"]
  },
  {
    id: "ball_valve_flanges",
    name: "Ball Valve (Flanged)",
    category: "Valves",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ball%20valve_flanges-62BAqbqKbTvBg78NhlZejLZ9vY8ezV.png",
    keywords: ["ball", "valve", "flange", "isolation"]
  },
  {
    id: "control_straight_flanges",
    name: "Control Valve Straight (Flanged)",
    category: "Valves",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/control%20straight_flanges%20-3GUJIaenaeq6KDZwMnYgQ4TzZh7KwI.png",
    keywords: ["control", "valve", "straight", "flange", "actuator"]
  },
  {
    id: "cap_thread",
    name: "Cap (Threaded)",
    category: "Fittings",
    connectionType: "Threaded",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cap_thread%20-WoAjTvdZjUll3cGC9PnVzU10U0NGD0.png",
    keywords: ["cap", "thread", "fitting", "end"]
  },
  {
    id: "direction_of_hand_wheel",
    name: "Direction of Hand Wheel",
    category: "Indicators",
    connectionType: "N/A",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/direction%20of%20had%20wheel%20-Jw2VrTerHLTM217BQZCvCkgRED42w4.png",
    keywords: ["direction", "hand", "wheel", "indicator", "arrow"]
  },
  {
    id: "branch_outlet_weldolet",
    name: "Branch Outlet (Weldolet)",
    category: "Fittings",
    connectionType: "Welded",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/branch%20outlet%20weldolet%20-RiOEHdkFxJxKKAUAs5wnuBH8pzXTjs.png",
    keywords: ["branch", "outlet", "weldolet", "tee", "connection"]
  },
  {
    id: "butterfly_valve_butt_weld",
    name: "Butterfly Valve (Butt Weld)",
    category: "Valves",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/butterfly%20valve_butt%20weld-17kAnJUDwj4TsRDhOZj3YXswuzqaHT.png",
    keywords: ["butterfly", "valve", "butt", "weld", "control"]
  },
  {
    id: "lap_joint_flanges",
    name: "Lap Joint (Flanged)",
    category: "Fittings",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lap%20joint_flanges%20-DZ2UZ1gURlKPv1PFUbn8PBVCn7vrcY.png",
    keywords: ["lap", "joint", "flange", "connection"]
  },
  {
    id: "elbow_90_threaded",
    name: "Elbow 90° (Threaded)",
    category: "Fittings",
    connectionType: "Threaded",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/elbow%2090_threaded-NLGTvbJK8JTvlWt40KsOTVvxzog6XO.png",
    keywords: ["elbow", "90", "degree", "threaded", "bend"]
  },
  {
    id: "elbow_45_butt_weld",
    name: "Elbow 45° (Butt Weld)",
    category: "Fittings",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/elbow%2045_butt%20weld%20-nRC0mrGyfUiES8RU2Dy2PQxpJJzFF9.png",
    keywords: ["elbow", "45", "degree", "butt", "weld", "bend"]
  },
  {
    id: "field_weld",
    name: "Field Weld",
    category: "Connections",
    connectionType: "Welded",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/field%20weld%20-zb8TBW9Qpq6AMQnZuSMsH1woWeFUvR.png",
    keywords: ["field", "weld", "FW", "site", "connection"]
  },
  {
    id: "elbow_45_threaded",
    name: "Elbow 45° (Threaded)",
    category: "Fittings",
    connectionType: "Threaded",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/elbow%2045_%20threaded-nYLEHcatN6NIcVnjIVEuF7NmZGFBKE.png",
    keywords: ["elbow", "45", "degree", "threaded", "bend"]
  },
  {
    id: "needle_valve_butt_weld",
    name: "Needle Valve (Butt Weld)",
    category: "Valves",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/needle%20valve_butt%20weld-089SX9ghk597YTys7dIhXOMrjoma2I.png",
    keywords: ["needle", "valve", "butt", "weld", "flow", "control"]
  },
  {
    id: "gate_valve_butt_weld",
    name: "Gate Valve (Butt Weld)",
    category: "Valves",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gate%20valve_butt%20weld%20-OCiin326dfLnMf0hhxjDv0kxEkAzZR.png",
    keywords: ["gate", "valve", "butt", "weld", "isolation"]
  },
  {
    id: "globe_valve_socket",
    name: "Globe Valve (Socket)",
    category: "Valves",
    connectionType: "Socket Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/globe%20valve_socket-rWVQKO0xlRQmEy7cT7XfuocjvwopWp.png",
    keywords: ["globe", "valve", "socket", "throttle", "control"]
  },
  {
    id: "flanged_branch_outlet_flangolet",
    name: "Flanged Branch Outlet (Flangolet)",
    category: "Fittings",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flanged%20branch%20outlet%20flangolet%20-dLGHTOQ9guVk1DwgHJZEvBIuK8jBKn.png",
    keywords: ["flanged", "branch", "outlet", "flangolet", "tee"]
  },
  {
    id: "orifice_assembly",
    name: "Orifice Assembly",
    category: "Instruments",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/orifice%20assembly%20-KE7EIsfc6J4stmWxET6Yq0p8dWNQ90.png",
    keywords: ["orifice", "assembly", "flow", "measurement", "meter"]
  },
  {
    id: "elbow_90_socket_weld",
    name: "Elbow 90° (Socket Weld)",
    category: "Fittings",
    connectionType: "Socket Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/elbow90_socket%20weld%20-5g57t9dVPxnSoYb7TJzNpdh1YWUZMB.png",
    keywords: ["elbow", "90", "degree", "socket", "weld", "bend"]
  },
  {
    id: "gate_valve_flanged",
    name: "Gate Valve (Flanged)",
    category: "Valves",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gate%20vavle_flanged%20-P2jtGLq8oGri6T1lR2VL9O84cB9hTJ.png",
    keywords: ["gate", "valve", "flange", "isolation"]
  },
  {
    id: "elbow_90_butt_weld",
    name: "Elbow 90° (Butt Weld)",
    category: "Fittings",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/elbow%2090_butt%20weld%20-KVDfB7WnJLbF0VxaBrefJNLJaXtWdy.png",
    keywords: ["elbow", "90", "degree", "butt", "weld", "bend"]
  },
  {
    id: "globe_valve_butt",
    name: "Globe Valve (Butt Weld)",
    category: "Valves",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/globe%20valve_butt%20-7G23ibSTH9x6bH3kYLvpImPVdBxHje.png",
    keywords: ["globe", "valve", "butt", "weld", "throttle"]
  },
  {
    id: "globe_valve_flanged",
    name: "Globe Valve (Flanged)",
    category: "Valves",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/globe%20valve_flanged%20-mzYuAEzrwceg83PVzvQqjh75wZI4aQ.png",
    keywords: ["globe", "valve", "flange", "throttle", "control"]
  },
  {
    id: "hammer_blind",
    name: "Hammer Blind",
    category: "Fittings",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hammer%20blind%20-2CG8lQvYRyugP6qHFAvshNp8WTyyrK.png",
    keywords: ["hammer", "blind", "HB", "isolation", "maintenance"]
  },
  {
    id: "gate_valve_socket",
    name: "Gate Valve (Socket)",
    category: "Valves",
    connectionType: "Socket Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gate%20valve_socket%20-pJU1VyvusuQ0IbDnxSY8hAoLqLbD3A.png",
    keywords: ["gate", "valve", "socket", "isolation"]
  },
  {
    id: "pipe_bend",
    name: "Pipe Bend",
    category: "Fittings",
    connectionType: "Welded",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pipe%20bend%20-unL9yjvs0HVqOzqYRQ1cK9MKjEGIPO.png",
    keywords: ["pipe", "bend", "radius", "R", "curve"]
  },
  {
    id: "needle_valve_flange",
    name: "Needle Valve (Flanged)",
    category: "Valves",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/needle%20valve_flange-XdYi6WVhGB6CyJ9V9yce2USzPuMAyt.png",
    keywords: ["needle", "valve", "flange", "flow", "control"]
  },
  {
    id: "meter_run",
    name: "Meter Run",
    category: "Instruments",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/meter%20run%20-iuxLKM5alw6D4ymlPBz3FV7NnSaGc9.png",
    keywords: ["meter", "run", "flow", "measurement", "instrumentation"]
  },
  {
    id: "plug_valve_socket",
    name: "Plug Valve (Socket)",
    category: "Valves",
    connectionType: "Socket Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/plug%20valve_socket%20-tpyywLvYJ2AopLt01QitCixfZveLvq.png",
    keywords: ["plug", "valve", "socket", "isolation", "quarter-turn"]
  },
  {
    id: "plug_valve_butt_weld",
    name: "Plug Valve (Butt Weld)",
    category: "Valves",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/plug%20valve_butt%20weld%20-rLXjzhKpXVNpaB2WwxYTvOtGUyonF0.png",
    keywords: ["plug", "valve", "butt", "weld", "isolation", "quarter-turn"]
  },
  {
    id: "threaded_flanges",
    name: "Threaded Flange",
    category: "Flanges",
    connectionType: "Threaded",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/threaded_flanges%20-QQpd3o0MHyHJc8Hwc9fZSeQXq1PcU0.png",
    keywords: ["threaded", "flange", "screw", "connection"]
  },
  {
    id: "slip_on_flanges",
    name: "Slip-On Flange",
    category: "Flanges",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slip%20on_flanges%20-MGQ2cNm3WzPvSWGWGlvoC9lEz8lZsF.png",
    keywords: ["slip", "on", "flange", "SORF", "connection"]
  },
  {
    id: "relief_valve_flanges",
    name: "Relief Valve (Flanged)",
    category: "Valves",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/relief%20valve_flanges-MKIiqpAlzBNqsJADWkjyYU6PM2W9lR.png",
    keywords: ["relief", "valve", "safety", "PSV", "pressure", "flange"]
  },
  {
    id: "pipe_to_pipe",
    name: "Pipe to Pipe Connection",
    category: "Connections",
    connectionType: "Welded",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pipe%20to%20pipe%20-8GjG4Pl7VrAzImwX5Qjmonoj32XrnS.png",
    keywords: ["pipe", "connection", "junction", "branch"]
  },
  {
    id: "spectacle_blind",
    name: "Spectacle Blind (SB)",
    category: "Fittings",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spectacle%20blind%20-rqSgjAw977KFuVC8pyEMmzZhc0vHba.png",
    keywords: ["spectacle", "blind", "SB", "isolation", "figure-8"]
  },
  {
    id: "spade",
    name: "Spade (SP)",
    category: "Fittings",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spade%20-E4L2ypd76oiYtOj5VamFORyNxwsOY1.png",
    keywords: ["spade", "SP", "isolation", "blank"]
  },
  {
    id: "tee_reducing_threaded",
    name: "Tee Reducing (Threaded)",
    category: "Fittings",
    connectionType: "Threaded",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tee%20reducing_threaded%20-HhzFb7RG7ika2U5VjEAzEGTUH5XeUC.png",
    keywords: ["tee", "reducing", "threaded", "branch", "junction"]
  },
  {
    id: "restriction_orifice",
    name: "Restriction Orifice (RO)",
    category: "Instruments",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/restriction%20orifice%20-dHNOEB9LkRoLvMdGGhmaxyyIFbZVdV.png",
    keywords: ["restriction", "orifice", "RO", "flow", "control"]
  },
  {
    id: "tee_reducing_butt_weld",
    name: "Tee Reducing (Butt Weld)",
    category: "Fittings",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tee%20reducing_butt%20weld%20-6Vx1dFN9vgR0rUUE9H53VWIpwfrUSP.png",
    keywords: ["tee", "reducing", "butt", "weld", "branch"]
  },
  {
    id: "reducer_concentric_butt_weld",
    name: "Reducer Concentric (Butt Weld)",
    category: "Fittings",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/reducer%20concentric_butt%20weld%20-RmjkDMlgtH0W4JCU8rqLaZP41k1owD.png",
    keywords: ["reducer", "concentric", "butt", "weld", "size", "change"]
  },
  {
    id: "plug_valve_flanged",
    name: "Plug Valve (Flanged)",
    category: "Valves",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/plug%20valve_flanged%20-ugvMEAvvFREqwFWaSKOtWTOqSfMOnr.png",
    keywords: ["plug", "valve", "flange", "isolation", "quarter-turn"]
  },
  {
    id: "reducer_eccentric_butt_weld",
    name: "Reducer Eccentric (Butt Weld)",
    category: "Fittings",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/reducer%20eccentic_butt%20weld%20-b8s2WrOOdfxgoj7RekTVuka03ydeTW.png",
    keywords: ["reducer", "eccentric", "butt", "weld", "size", "change"]
  },
  {
    id: "tee_reducing_socket_weld",
    name: "Tee Reducing (Socket Weld)",
    category: "Fittings",
    connectionType: "Socket Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tee%20reducing_%20socket%20weld%20-Z19RX257w9cdnMpKuubNgASdhZft3B.png",
    keywords: ["tee", "reducing", "socket", "weld", "branch"]
  },
  {
    id: "tee_equal_butt_weld",
    name: "Tee Equal (Butt Weld)",
    category: "Fittings",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tee%20equal_butt%20weld%20-OnwVoCITb26DDaCHJopRW5DeI8o0M7.png",
    keywords: ["tee", "equal", "butt", "weld", "branch", "junction"]
  },
  {
    id: "tee_equal_socket_weld",
    name: "Tee Equal (Socket Weld)",
    category: "Fittings",
    connectionType: "Socket Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tee%20equal_socket%20weld%20-xOwQbLxANdK1F5RGmHiHSL40yb7TVs.png",
    keywords: ["tee", "equal", "socket", "weld", "branch", "junction"]
  },
  {
    id: "socket_weld_flanges",
    name: "Socket Weld Flange",
    category: "Flanges",
    connectionType: "Socket Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/socket%20weld_flanges%20-KSrkdtbC1e1L013JdQG9XL17i3aS5o.png",
    keywords: ["socket", "weld", "flange", "SWRF", "connection"]
  },
  {
    id: "spacer",
    name: "Spacer",
    category: "Fittings",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spacer%20-4XkLwOVaCk2es8k7HSw1Hnk8G5ePkD.png",
    keywords: ["spacer", "ring", "flange", "gap"]
  },
  {
    id: "tee_equal_threaded",
    name: "Tee Equal (Threaded)",
    category: "Fittings",
    connectionType: "Threaded",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tee%20equal_threaded-pcveOuUuv3MihMq2OPAGSAHTeGnOFJ.png",
    keywords: ["tee", "equal", "threaded", "branch", "junction"]
  },
  {
    id: "welding_neck_flanges",
    name: "Welding Neck Flange (WNRF)",
    category: "Flanges",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welding%20neck_flanges%20-FUocuJtmRnkmOIdCBIkOOs5OATraC0.png",
    keywords: ["welding", "neck", "flange", "WNRF", "butt", "weld"]
  },
  {
    id: "ytype_valve_flanges",
    name: "Y-Type Valve (Flanged)",
    category: "Valves",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ytype%20valve_flanges-6LR0lO6LGopE2bpip8EmQbZPqfLXGs.png",
    keywords: ["y-type", "valve", "flange", "globe", "angle"]
  },
  {
    id: "ytype_valve_socket",
    name: "Y-Type Valve (Socket)",
    category: "Valves",
    connectionType: "Socket Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ytype%20valve_socket%20-w8ZiUilRkpbVhmKymkxufLxFUkAQVx.png",
    keywords: ["y-type", "valve", "socket", "globe", "angle"]
  },
  {
    id: "threeway_valve_butt_weld",
    name: "Three-Way Valve (Butt Weld)",
    category: "Valves",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/threeway%20valve_butt%20weld%20-Jiongu1BPQBWcPf3utIprpIOKveeHy.png",
    keywords: ["three-way", "3-way", "valve", "butt", "weld", "diverter"]
  },
  {
    id: "threeway_valve_flanges",
    name: "Three-Way Valve (Flanged)",
    category: "Valves",
    connectionType: "Flanged",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/threeway%20valve_flanges%20-sbO8wvO57xycXfRIXez9M6cE68bAEi.png",
    keywords: ["three-way", "3-way", "valve", "flange", "diverter"]
  },
  {
    id: "y_type_strainer",
    name: "Y-Type Strainer",
    category: "Strainers",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/y%20type%20strainer%20-kzENFikPJA8dpCwx8itXxHKCUEBqOg.png",
    keywords: ["y-type", "strainer", "filter", "debris", "screen"]
  },
  {
    id: "ytype_valve_butt_weld",
    name: "Y-Type Valve (Butt Weld)",
    category: "Valves",
    connectionType: "Butt Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/y%20type%20valve_butt%20weld%20-XxJJUkZxs5BrEPcneKsP1XddbW3QJw.png",
    keywords: ["y-type", "valve", "butt", "weld", "globe", "angle"]
  },
  {
    id: "threeway_valve_socket",
    name: "Three-Way Valve (Socket)",
    category: "Valves",
    connectionType: "Socket Weld",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/threeway%20valve_socket%20-ceIVs1sULIwDESmkQIBu7nSzAwdKiP.png",
    keywords: ["three-way", "3-way", "valve", "socket", "diverter"]
  },
  // Isometric Drawing Symbols from PDF
  {
    id: "direction_symbol",
    name: "Direction Symbol (N/S/E/W)",
    category: "Isometric Symbols",
    connectionType: "Reference",
    imageUrl: "",
    keywords: ["direction", "north", "south", "east", "west", "compass", "orientation", "isometric"]
  },
  {
    id: "line_number",
    name: "Line Number",
    category: "Isometric Symbols",
    connectionType: "Reference",
    imageUrl: "",
    keywords: ["line", "number", "designation", "pipe", "identification", "tag"]
  },
  {
    id: "spool_number",
    name: "Spool Number",
    category: "Isometric Symbols",
    connectionType: "Reference",
    imageUrl: "",
    keywords: ["spool", "number", "fabrication", "sub-division", "transportation"]
  },
  {
    id: "rolling_vertical",
    name: "Rolling/Offset (Vertical)",
    category: "Isometric Symbols",
    connectionType: "Reference",
    imageUrl: "",
    keywords: ["rolling", "offset", "vertical", "direction", "change", "hatch"]
  },
  {
    id: "rolling_horizontal",
    name: "Rolling/Offset (Horizontal)",
    category: "Isometric Symbols",
    connectionType: "Reference",
    imageUrl: "",
    keywords: ["rolling", "offset", "horizontal", "direction", "change", "hatch"]
  },
  {
    id: "rolling_combined",
    name: "Rolling/Offset (Vertical & Horizontal)",
    category: "Isometric Symbols",
    connectionType: "Reference",
    imageUrl: "",
    keywords: ["rolling", "offset", "vertical", "horizontal", "combined", "direction", "change", "triangle"]
  },
  {
    id: "pipe_slope_up",
    name: "Pipe Slope (Up)",
    category: "Isometric Symbols",
    connectionType: "Reference",
    imageUrl: "",
    keywords: ["slope", "up", "rise", "gradient", "angle", "elevation"]
  },
  {
    id: "pipe_slope_down",
    name: "Pipe Slope (Down)",
    category: "Isometric Symbols",
    connectionType: "Reference",
    imageUrl: "",
    keywords: ["slope", "down", "fall", "gradient", "angle", "elevation"]
  },
  {
    id: "break_line",
    name: "Break Line (Continuation)",
    category: "Isometric Symbols",
    connectionType: "Reference",
    imageUrl: "",
    keywords: ["break", "line", "continuation", "drawing", "split"]
  },
  {
    id: "match_line",
    name: "Match Line",
    category: "Isometric Symbols",
    connectionType: "Reference",
    imageUrl: "",
    keywords: ["match", "line", "continuation", "reference", "drawing"]
  },
  {
    id: "weld_symbol",
    name: "Weld Symbol (Shop/Field)",
    category: "Connections",
    connectionType: "Welded",
    imageUrl: "",
    keywords: ["weld", "symbol", "shop", "field", "fabrication", "joint"]
  },
  {
    id: "support_shoe",
    name: "Pipe Support (Shoe)",
    category: "Supports",
    connectionType: "Reference",
    imageUrl: "",
    keywords: ["support", "shoe", "pipe", "rest", "elevation"]
  },
  {
    id: "support_hanger",
    name: "Pipe Support (Hanger)",
    category: "Supports",
    connectionType: "Reference",
    imageUrl: "",
    keywords: ["support", "hanger", "pipe", "suspended", "overhead"]
  },
  {
    id: "support_guide",
    name: "Pipe Support (Guide)",
    category: "Supports",
    connectionType: "Reference",
    imageUrl: "",
    keywords: ["support", "guide", "pipe", "axial", "movement"]
  },
  {
    id: "support_anchor",
    name: "Pipe Support (Anchor)",
    category: "Supports",
    connectionType: "Reference",
    imageUrl: "",
    keywords: ["support", "anchor", "pipe", "fixed", "restraint"]
  },
  {
    id: "expansion_loop",
    name: "Expansion Loop",
    category: "Fittings",
    connectionType: "Welded",
    imageUrl: "",
    keywords: ["expansion", "loop", "thermal", "movement", "flexibility"]
  },
  {
    id: "union_threaded",
    name: "Union (Threaded)",
    category: "Fittings",
    connectionType: "Threaded",
    imageUrl: "",
    keywords: ["union", "threaded", "connection", "disconnect", "maintenance"]
  },
  {
    id: "union_socket",
    name: "Union (Socket Weld)",
    category: "Fittings",
    connectionType: "Socket Weld",
    imageUrl: "",
    keywords: ["union", "socket", "weld", "connection", "disconnect"]
  },
  {
    id: "coupling_threaded",
    name: "Coupling (Threaded)",
    category: "Fittings",
    connectionType: "Threaded",
    imageUrl: "",
    keywords: ["coupling", "threaded", "connection", "joint"]
  },
  {
    id: "coupling_socket",
    name: "Coupling (Socket Weld)",
    category: "Fittings",
    connectionType: "Socket Weld",
    imageUrl: "",
    keywords: ["coupling", "socket", "weld", "connection", "joint"]
  },
  {
    id: "nipple",
    name: "Nipple",
    category: "Fittings",
    connectionType: "Threaded",
    imageUrl: "",
    keywords: ["nipple", "short", "pipe", "connection", "threaded"]
  },
  {
    id: "cross_fitting",
    name: "Cross Fitting",
    category: "Fittings",
    connectionType: "Butt Weld",
    imageUrl: "",
    keywords: ["cross", "fitting", "four-way", "junction", "branch"]
  },
  {
    id: "swage_concentric",
    name: "Swage (Concentric)",
    category: "Fittings",
    connectionType: "Threaded",
    imageUrl: "",
    keywords: ["swage", "concentric", "reducer", "size", "change"]
  },
  {
    id: "swage_eccentric",
    name: "Swage (Eccentric)",
    category: "Fittings",
    connectionType: "Threaded",
    imageUrl: "",
    keywords: ["swage", "eccentric", "reducer", "size", "change", "offset"]
  },
  {
    id: "instrument_connection",
    name: "Instrument Connection",
    category: "Instruments",
    connectionType: "Threaded",
    imageUrl: "",
    keywords: ["instrument", "connection", "gauge", "sensor", "tap"]
  },
  {
    id: "drain_connection",
    name: "Drain Connection",
    category: "Connections",
    connectionType: "Threaded",
    imageUrl: "",
    keywords: ["drain", "connection", "blowdown", "vent", "low", "point"]
  },
  {
    id: "vent_connection",
    name: "Vent Connection",
    category: "Connections",
    connectionType: "Threaded",
    imageUrl: "",
    keywords: ["vent", "connection", "air", "release", "high", "point"]
  },
  {
    id: "steam_trap",
    name: "Steam Trap",
    category: "Instruments",
    connectionType: "Flanged",
    imageUrl: "",
    keywords: ["steam", "trap", "condensate", "drain", "thermodynamic"]
  },
  {
    id: "sight_glass",
    name: "Sight Glass",
    category: "Instruments",
    connectionType: "Flanged",
    imageUrl: "",
    keywords: ["sight", "glass", "view", "flow", "indicator", "window"]
  },
  {
    id: "expansion_joint",
    name: "Expansion Joint",
    category: "Fittings",
    connectionType: "Flanged",
    imageUrl: "",
    keywords: ["expansion", "joint", "bellows", "thermal", "movement", "flexibility"]
  },
  {
    id: "flex_hose",
    name: "Flexible Hose",
    category: "Fittings",
    connectionType: "Flanged",
    imageUrl: "",
    keywords: ["flexible", "hose", "vibration", "movement", "connection"]
  }
]

export const categories = [...new Set(pidSymbols.map(s => s.category))]
export const connectionTypes = [...new Set(pidSymbols.map(s => s.connectionType))]
