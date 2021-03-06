//
// Created by Sean on 8/14/2019.
//

#ifndef GAMEENGINE_POINTLIGHT_H
#define GAMEENGINE_POINTLIGHT_H

#include "Light.h"

class PointLight : virtual public Light
{
public:
	PointLight(std::string ID);
	PointLight(glm::vec3 position, std::string ID);
	PointLight(glm::vec3 position, float constant, float linear, float quadratic, std::string ID);
	PointLight(glm::vec3 position, float constant, float linear, float quadratic,
			   glm::vec3 color, std::string ID);
	void updateFalloff(float constant, float linear, float quadratic);
	virtual void updatePosition(glm::vec3 position);
	virtual void render(Shader *targetShader);
	void setShaderPosition(Shader *targetShader);
	void setShaderconstant(Shader *targetShader);
	void setShaderLinear(Shader *targetShader);
	void setShaderQuadratic(Shader *targetShader);
	void setShaderRadius(Shader *targetShader);
	void calcLightRadius(void);
	void setID(std::string ID);

	glm::vec3 getPosition(void);
	float getConstant(void);
	float getLinear(void);
	float getQuadratic(void);
private:
	glm::vec3 m_position;      // Position of light
	float m_constant;
	float m_linear;
	float m_quadratic;
	float m_radius;
	const std::string m_lightType = "PointLight";
};


#endif //GAMEENGINE_POINTLIGHT_H
