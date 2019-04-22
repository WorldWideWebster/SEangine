//
// Created by Sean on 3/12/2019.
//

#ifndef OPENGLSETUP_LIBS_H
#define OPENGLSETUP_LIBS_H

// STD Library Includes
#include <fstream>
#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <ctime>
#include <map>

// OpenGL includes
#include <glad/glad.h> // holds all OpenGL type declarations
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>
#include <GLFW/glfw3.h>

// Engine Includes
#include "camera.h"
#include "primitives/depreciated/cube.h"
#include "main_defs.h"
#include "mesh.h"
#include "model.h"
#include "primitives/Primitive.h"
#include "RenderBuffer.h"
#include "shader.h"
#include "primitives/Terrain.h"
#include "texture.h"
#include "vertex.h"
#include "vertices.h"
#include "window.h"


/******* EXTERNAL LIBRARIES ********/
// STBI
#include "stb_image.h"

// IMGUI
#include "imgui/imgui.h"
#include "imgui/imgui_impl_glfw.h"
#include "imgui/imgui_impl_opengl3.h"

#endif //OPENGLSETUP_LIBS_H
