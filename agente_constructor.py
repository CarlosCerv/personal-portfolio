import os
import sys
from langchain_community.llms import Ollama
from langchain.agents import initialize_agent, Tool, AgentType

# --- 1. FUNCIÓN DE DIAGNÓSTICO (Para saber qué ve Python) ---
def diagnostico_previo():
    archivos = [f for f in os.listdir('.') if os.path.isfile(f) and f != 'agente_constructor.py']
    print(f"🔍 Diagnóstico de carpeta: {os.getcwd()}")
    if not archivos:
        print("⚠️  ATENCIÓN: Python no detecta archivos en esta carpeta (solo el script del agente).")
    else:
        print(f"✅ Archivos detectados para el agente: {archivos}")
    print("-" * 50)

# --- 2. HERRAMIENTAS MEJORADAS ---

def leer_proyecto(ignore=""):
    """Lee TODOS los archivos de texto en la carpeta actual sin filtros estrictos."""
    contexto = ""
    # Extensiones de código comunes
    ext_validas = ('.py', '.js', '.html', '.css', '.md', '.txt', '.json', '.yaml', '.yml', '.sql', '.c', '.cpp')
    
    for archivo in os.listdir('.'):
        if os.path.isfile(archivo) and archivo.endswith(ext_validas):
            if archivo == "agente_constructor.py": continue
            try:
                with open(archivo, 'r', encoding='utf-8') as f:
                    contexto += f"\n--- CONTENIDO DE: {archivo} ---\n{f.read()}\n"
            except Exception as e:
                contexto += f"\n[Error leyendo {archivo}: {e}]\n"
                
    return contexto if contexto else "La carpeta no contiene archivos de código legibles."

def escribir_archivo(input_str):
    """Crea o edita archivos. Formato requerido: 'nombre_archivo|contenido'"""
    try:
        if "|" not in input_str:
            return "Error: Usa el formato 'nombre|contenido'. Ejemplo: 'test.py|print(1)'"
        
        nombre, contenido = input_str.split("|", 1)
        with open(nombre.strip(), "w", encoding='utf-8') as f:
            f.write(contenido.strip())
        return f"✅ ¡Hecho! Archivo '{nombre.strip()}' actualizado."
    except Exception as e:
        return f"❌ Error técnico al escribir: {str(e)}"

# --- 3. CONFIGURACIÓN DEL CEREBRO (Gemma 4) ---

# Usamos Gemma 4 por su ventana de contexto de 256k, ideal para proyectos grandes.
llm = Ollama(model="gemma4:e4b", temperature=0) 

tools = [
    Tool(
        name="Analizar_Proyecto_Local",
        func=leer_proyecto,
        description="Usa esta herramienta para leer el código actual. No requiere argumentos."
    ),
    Tool(
        name="Escribir_o_Modificar_Archivo",
        func=escribir_archivo,
        description="Usa esto para crear archivos. FORMATO: 'nombre.ext|contenido_completo'"
    )
]

# Inicializamos el agente con un sistema de razonamiento robusto
agente = initialize_agent(
    tools, 
    llm, 
    agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
    handle_parsing_errors=True
)

# --- 4. EJECUCIÓN ---

if __name__ == "__main__":
    diagnostico_previo()
    print("🚀 Agente Antigravity v2 (Codex Mode) iniciado.")
    print("Escribe 'salir' para terminar.")

    while True:
        try:
            tarea = input("\n👉 ¿Qué instrucción quieres ejecutar?: ")
            if tarea.lower() in ["salir", "exit", "quit"]:
                break
            
            # Reforzamos el contexto en cada instrucción
            prompt_final = f"""Estamos en la carpeta: {os.getcwd()}. 
            Si necesitas saber qué hay, usa Analizar_Proyecto_Local.
            Tarea del usuario: {tarea}"""
            
            agente.run(prompt_final)
        except KeyboardInterrupt:
            break