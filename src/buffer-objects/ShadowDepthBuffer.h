//
// Created by Sean on 4/16/2019.
//

#ifndef OPENGLSETUP_FRAMEBUFFER_H
#define OPENGLSETUP_FRAMEBUFFER_H
// OpenGL includes
#include <glad/glad.h> // holds all OpenGL type declarations
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>

#include "shader/shader.h"
#include "BufferObject.h"
const unsigned int SHADOW_WIDTH = 1024, SHADOW_HEIGHT = 1024;

/**
 * @brief Class to hold shadow depth buffer objects and related functions
 *
 *
 * Shadow depth buffer state machine works like so
 *
 * setup -> renderloop[prime shadow buffer -> render scene from light POV - > uinbind shadow buffer -> render scene normally]
 */
class ShadowDepthBuffer : public BufferObject
{
public:
	/**
	 * @brief Default FrameBuffer ShadowDepthBuffer, runs setUp() function
	 */
	ShadowDepthBuffer();

	/**
	 * @brief sets up frame buffer with ID and buffer objects
	 */
	void setUp();

	/**
     * @brief Binds shadow buffer setting it up to capture depths
	 * @param lightPos position of directional light
	 * @param simpleDepthShader depth shader to be used
	 */
	void bind(glm::vec3 lightPos, Shader simpleDepthShader);

	/**
	 * @brief Unbinds the shadow depth buffer so we don't keep writing to it
	 */
	void unbind(void);
	void doDebugDepth(void);

	GLuint getTextureBuffer();

private:
	GLuint m_ID;
	GLuint m_rbo;
	unsigned int m_depthMap;
};


#endif //OPENGLSETUP_FRAMEBUFFER_H

